import '../css/cp.css';
import './safeCustomElementDefine.js';
import { registerPluginKit } from './pluginKit.js';
import { mountDataTables } from './dataTables.js';

registerPluginKit();

// Configure the table before connecting it so the first request uses the page's filters.
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountDataTables, { once: true });
} else {
    mountDataTables();
}
