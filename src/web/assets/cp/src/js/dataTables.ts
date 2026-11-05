import { html } from 'lit';
import {
    dataTableLabels,
    defaultDataTableQuery,
    persistDataTableView,
    type DataTableColumn,
    type DataTableFilter,
    type DataTableQuery,
    type DataTableRow,
    type PkDataTable,
} from '@verbb/plugin-kit-web/components/data-table.js';
import type { PkSelect, PkOption } from '@verbb/plugin-kit-web/components/select.js';
import type { PkStatusVariant } from '@verbb/plugin-kit-web/components/status/pk-status.js';

declare const Craft: {
    t: (category: string, message: string, params?: Record<string, unknown>) => string;
    getActionUrl: (action: string) => string;
    sendActionRequest: (method: string, action: string, options: { data: Record<string, unknown> }) => Promise<{ data: { message?: string } }>;
    cp: { displaySuccess: (message?: string) => void; displayError: (message?: string) => void };
};

type TableKind = 'products' | 'subscriptions' | 'activity';
type TableConfig = {
    kind: TableKind;
    userId?: string;
    variantId?: number;
    productType?: number;
    showSite?: boolean;
    search?: string;
    demand?: string;
    sort?: string;
    state?: string | null;
    type?: string | null;
    attention?: boolean;
};
type Presentation = { label: string; status: PkStatusVariant; url?: string };
type TableResponse = {
    data: DataTableRow[];
    pagination: { total: number; current_page: number };
};

const t = (message: string, params?: Record<string, unknown>) => Craft.t('craft-commerce-back-in-stock', message, params);
const choices = (values: Record<string, string>) => Object.entries(values).map(([value, label]) => ({ value, label: t(label) }));
const filter = (id: string, label: string, values: Record<string, string>): DataTableFilter => ({
    id, label: t(label), type: 'select', operators: ['equals'], options: choices(values),
});

function columns(config: TableConfig): DataTableColumn[] {
    if (config.kind === 'products') return [
        { id: 'title', label: t('Product / Variant'), type: 'link', href: row => String(row.url), sortable: true, hideable: false },
        { id: 'productType', label: t('Product Type'), sortable: true },
        { id: 'sku', label: t('SKU'), sortable: true },
        { id: 'waiting', label: t('Waiting'), type: 'number', sortable: true },
        // Dates are already formatted by Craft in the CP locale and timezone.
        { id: 'latestRequest', label: t('Latest Request'), wrap: false, sortable: true },
    ];
    if (config.kind === 'subscriptions') return [
        { id: 'subscriber', label: t('Subscriber'), sortable: true, hideable: false },
        { id: 'state', label: t('State'), type: 'status', sortable: true,
            value: row => (row.state as Presentation).label,
            status: row => (row.state as Presentation).status },
        ...(config.showSite ? [{ id: 'site', label: Craft.t('app', 'Site'), sortable: true }] : []),
        { id: 'subscribed', label: t('Subscribed'), wrap: false, sortable: true },
    ];
    // Lifecycle activity is intentionally chronological, not arbitrarily sortable.
    return [
        { id: 'event', label: t('Event'), hideable: false, renderCell: ({ value }) => {
            const event = value as Presentation;
            const content = html`<pk-status .status=${event.status} aria-hidden="true"></pk-status> ${event.label}`;
            return event.url ? html`<a href=${event.url}>${content}</a>` : html`<span>${content}</span>`;
        } },
        { id: 'when', label: t('When'), wrap: false },
    ];
}

function filters(config: TableConfig): DataTableFilter[] {
    if (config.kind === 'subscriptions') return [filter('state', 'State', {
        pendingVerification: 'Pending verification', active: 'Active', notified: 'Notified', cancelled: 'Cancelled', expired: 'Expired',
    })];
    const review = filter('attention', 'Review state', { '1': 'Needs review' });
    return config.kind === 'products'
        ? [filter('demand', 'Demand', { active: 'Waiting now', past: 'Past demand' }), review]
        : [filter('type', 'Activity type', { subscription: 'Subscription changes', notification: 'Notification sending' }), review];
}

function initialQuery(config: TableConfig, table: PkDataTable): DataTableQuery {
    const params = new URL(location.href).searchParams;
    const query: DataTableQuery = {
        ...defaultDataTableQuery(),
        search: config.kind === 'activity' ? '' : params.get('search') ?? config.search ?? '',
        sort: table.defaultSort,
        filters: {},
        pageSize: config.kind === 'products' ? 100 : 50,
        pageIndex: Math.max(0, (Number(params.get('page')) || 1) - 1),
    };
    for (const definition of filters(config)) {
        const value = params.get(definition.id) ?? config[definition.id as keyof TableConfig];
        const normalized = value === true ? '1' : String(value ?? '');
        if (definition.options?.some(option => option.value === normalized)) query.filters[definition.id] = normalized;
    }
    const order = params.get('order');
    if (table.columns.some(column => column.id === order && column.sortable)) {
        query.sort = [{ id: order!, direction: params.get('direction') === 'desc' ? 'desc' : 'asc' }];
    }
    return query;
}

function syncUrl(table: PkDataTable, config: TableConfig): void {
    const url = new URL(location.href);
    const query = table.query;
    for (const key of ['search', 'order', 'direction', 'page', ...filters(config).map(item => item.id)]) url.searchParams.delete(key);
    if (query.search) url.searchParams.set('search', query.search);
    if (query.sort[0]) {
        url.searchParams.set('order', query.sort[0].id);
        url.searchParams.set('direction', query.sort[0].direction);
    }
    if (query.pageIndex) url.searchParams.set('page', String(query.pageIndex + 1));
    for (const [key, value] of Object.entries(query.filters)) url.searchParams.set(key, String(value));
    // Explicitly retain "all states": absence defaults to active on a fresh variant page.
    if (config.kind === 'subscriptions' && !query.filters.state) url.searchParams.set('state', 'all');
    history.replaceState(history.state, '', url);
    document.querySelectorAll<HTMLAnchorElement>('[data-bis-product-source]').forEach(link => {
        const target = new URL(link.href);
        const type = target.searchParams.get('productType');
        target.search = url.search;
        target.searchParams.delete('page');
        if (type) target.searchParams.set('productType', type);
        else target.searchParams.delete('productType');
        link.href = target.toString();
    });
}

function statusControl(table: PkDataTable, config: TableConfig): PkSelect {
    const select = document.createElement('pk-select') as PkSelect;
    select.slot = 'toolbar-start';
    select.setAttribute('aria-label', t('Status'));
    const options = [{ value: 'all', label: t('All statuses') }, ...filters(config)[0].options!];
    for (const choice of options) {
        const option = document.createElement('pk-option') as PkOption;
        option.value = choice.value;
        option.textContent = choice.label;
        select.append(option);
    }
    const sync = () => { select.value = String(table.query.filters.state ?? 'all'); };
    sync();
    select.addEventListener('change', () => {
        const next = { ...table.query.filters };
        if (select.value === 'all') delete next.state;
        else next.state = select.value;
        table.setQuery({ filters: next });
    });
    table.addEventListener('pk-query-change', sync);
    return select;
}

function subscriptionActions(table: PkDataTable): void {
    table.rowLabel = 'subscriber';
    table.rowActions = row => [
        ...(row.canCancel ? [{ id: 'cancel-subscription', label: t('Cancel subscription') }] : []),
        ...(row.canErase ? [{ id: 'erase-subscriber', label: t('Erase subscriber data') }] : []),
    ];
    table.addEventListener('pk-row-action', async (event: Event) => {
        const { action, row } = (event as CustomEvent<{ action: string; row: DataTableRow }>).detail;
        const prompt = action === 'erase-subscriber'
            ? t('Erase all Back in Stock data for {email}? This removes the address from every product and cancels anything they’re waiting for. This can’t be undone.', { email: row.subscriber })
            : t('Cancel this subscription for {email}? They won’t be notified about this product.', { email: row.subscriber });
        if (!confirm(prompt)) return;
        try {
            const response = await Craft.sendActionRequest('POST', `craft-commerce-back-in-stock/dashboard/${action}`, { data: { subscriptionId: row.id } });
            Craft.cp.displaySuccess(response.data.message);
        } catch (error) {
            Craft.cp.displayError((error as { response?: { data?: { message?: string } } }).response?.data?.message);
        }
        // The server decides what happened, including when this row was already out of date.
        await table.refresh();
    });
}

function mount(container: HTMLElement): void {
    const config = JSON.parse(container.dataset.bisTable ?? '{}') as TableConfig;
    const table = document.createElement('pk-data-table') as PkDataTable;
    table.mode = 'remote';
    table.layout = 'index';
    if (container.classList.contains('bis-table--index')) {
        const header = document.querySelector<HTMLElement>('#header');
        if (header) {
            // Follow Craft's sticky title height when the sidebar or viewport changes.
            const observer = new ResizeObserver(() => {
                if (!table.isConnected) {
                    observer.disconnect();
                    return;
                }
                table.style.setProperty('--pk-data-table-header-offset', `${header.offsetHeight}px`);
            });
            observer.observe(header);
        }
    }
    table.label = t(config.kind === 'products' ? 'Products' : config.kind === 'subscriptions' ? 'Subscriptions' : 'Activity');
    table.searchable = config.kind !== 'activity';
    table.hideToolbar = config.kind === 'activity';
    table.columns = columns(config);
    table.filters = config.kind === 'subscriptions' ? [] : filters(config);
    table.defaultSort = config.kind === 'products'
        ? [{ id: config.sort === 'recent' ? 'latestRequest' : 'waiting', direction: 'desc' }]
        : config.kind === 'subscriptions' ? [{ id: 'subscribed', direction: 'desc' }] : [];
    table.labels = Object.fromEntries(Object.entries(dataTableLabels).map(([key, value]) => [key, t(value)]));
    table.labels = {
        ...table.labels,
        search: t(config.kind === 'products' ? 'Search products, variants, SKUs or subscriber emails' : 'Search email addresses'),
        empty: t(config.kind === 'products' ? 'No products have Back in Stock activity yet.' : config.kind === 'subscriptions' ? 'No subscriptions exist for this variant yet.' : 'No matching activity yet.'),
        noResults: t(config.kind === 'products' ? 'No product variants match those filters.' : config.kind === 'subscriptions' ? 'No subscriptions match those filters.' : 'No matching activity yet.'),
    };
    table.query = initialQuery(config, table);
    if (config.userId && config.kind !== 'activity') {
        const params = new URL(location.href).searchParams;
        const explicitSort = table.columns.some(column => column.sortable && column.id === params.get('order')) ||
            (config.kind === 'products' && ['recent', 'waiting'].includes(params.get('sort') ?? ''));
        persistDataTableView(table, {
            key: `back-in-stock:${config.kind}`,
            userId: config.userId,
            restoreSort: !explicitSort,
        });
    }
    if (config.kind === 'subscriptions') {
        table.append(statusControl(table, config));
        subscriptionActions(table);
    }
    const action = config.kind === 'products' ? 'product-table' : config.kind === 'subscriptions' ? 'subscription-table' : 'activity-table';
    table.dataSource = async (query, { signal }) => {
        const url = new URL(Craft.getActionUrl(`craft-commerce-back-in-stock/dashboard/${action}`), location.href);
        url.searchParams.set('page', String(query.pageIndex + 1));
        url.searchParams.set('per_page', String(query.pageSize));
        url.searchParams.set('search', query.search);
        if (config.variantId) url.searchParams.set('variantId', String(config.variantId));
        if (config.productType) url.searchParams.set('productType', String(config.productType));
        for (const [key, value] of Object.entries(query.filters)) url.searchParams.set(key, String(value));
        if (query.sort[0]) {
            url.searchParams.set('sort[0][sortField]', query.sort[0].id);
            url.searchParams.set('sort[0][direction]', query.sort[0].direction);
        }
        // Keep the existing endpoint contract; Kit owns request cancellation and stale-response rejection.
        const response = await fetch(url, { signal, credentials: 'same-origin', headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' } });
        if (!response.ok) throw new Error(`Back In Stock table request failed (${response.status}).`);
        const result = await response.json() as TableResponse;
        if (!Array.isArray(result.data) || !Number.isFinite(result.pagination?.total)) throw new Error('Invalid table response.');
        // The server clamps out-of-range pages, so request that page before accepting its rows.
        if (!signal.aborted && table.isConnected && query.pageIndex !== result.pagination.current_page - 1) {
            table.setQuery({ pageIndex: Math.max(0, result.pagination.current_page - 1) });
        }
        return { rows: result.data, total: result.pagination.total };
    };
    table.addEventListener('pk-query-change', () => syncUrl(table, config));
    container.replaceChildren(table);
    syncUrl(table, config);
}

export function mountDataTables(): void {
    document.querySelectorAll<HTMLElement>('[data-bis-table]').forEach(mount);
}
