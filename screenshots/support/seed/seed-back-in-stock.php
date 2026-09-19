// craft-screenshots: sample-frontend
/** Seed a real Commerce product and Back in Stock request history. */

use craft\commerce\elements\Product;
use craft\commerce\elements\Variant;
use craft\commerce\models\ProductType;
use craft\commerce\models\ProductTypeSite;
use craft\commerce\Plugin as Commerce;
use craft\helpers\FileHelper;
use craft\helpers\Json;
use craft\models\FieldLayout;
use verbb\backinstock\BackInStock;

$commerce = Commerce::getInstance();
$elements = Craft::$app->getElements();
$site = Craft::$app->getSites()->getPrimarySite();
$productTypes = $commerce->getProductTypes();
$type = $productTypes->getProductTypeByHandle('screenshotGoods');

if (!$type) {
    $type = new ProductType([
        'name' => 'Screenshot Goods',
        'handle' => 'screenshotGoods',
        'hasProductTitleField' => true,
        'hasVariantTitleField' => true,
        'maxVariants' => 12,
    ]);
    $type->getBehavior('productFieldLayout')->setFieldLayout(new FieldLayout(['type' => Product::class]));
    $type->getBehavior('variantFieldLayout')->setFieldLayout(new FieldLayout(['type' => Variant::class]));
    $type->setSiteSettings([
        $site->id => new ProductTypeSite([
            'siteId' => $site->id,
            'hasUrls' => true,
            'uriFormat' => 'shop/{slug}',
            'template' => 'shop/_product',
            'enabledByDefault' => true,
        ]),
    ]);

    if (!$productTypes->saveProductType($type)) {
        throw new RuntimeException('Unable to save the Back in Stock screenshot product type: ' . Json::encode($type->getErrors()));
    }
}

$product = Product::find()->typeId($type->id)->slug('harbour-linen-throw')->siteId($site->id)->status(null)->one();

if (!$product) {
    $product = new Product([
        'typeId' => $type->id,
        'siteId' => $site->id,
        'title' => 'Harbour linen throw',
        'slug' => 'harbour-linen-throw',
        'postDate' => new DateTime('2026-09-01 09:00:00'),
        'enabled' => true,
    ]);
    if (!$elements->saveElement($product)) {
        throw new RuntimeException('Unable to save the Back in Stock screenshot product: ' . Json::encode($product->getErrors()));
    }
}

$variant = Variant::find()->sku('HLT-OAT-L')->status(null)->one();

if (!$variant) {
    $variant = new Variant([
        'title' => 'Oatmeal / Large',
        'siteId' => $site->id,
        'enabled' => true,
        'availableForPurchase' => true,
        'inventoryTracked' => false,
        'isDefault' => true,
    ]);
    $variant->setSku('HLT-OAT-L');
    $variant->setBasePrice(189);
    $variant->setOwnerId($product->id);
    $variant->setPrimaryOwnerId($product->id);

    if (!$elements->saveElement($variant)) {
        throw new RuntimeException('Unable to save the Back in Stock screenshot variant: ' . Json::encode($variant->getErrors()));
    }

    $product->setVariants([$variant]);
    $elements->saveElement($product, false);
}

if (!$variant) {
    throw new RuntimeException('Unable to resolve the Back in Stock screenshot variant.');
}

$requests = [
    ['maya.chen@example.com', false, '2026-09-18 08:42:00'],
    ['oliver.grant@example.com', false, '2026-09-18 07:18:00'],
    ['priya.nair@example.com', true, '2026-09-17 16:05:00'],
    ['daniel.brooks@example.com', false, '2026-09-17 12:26:00'],
    ['lena.ortiz@example.com', true, '2026-09-16 18:14:00'],
    ['noah.patel@example.com', false, '2026-09-16 09:37:00'],
];

foreach ($requests as [$email, $notified, $created]) {
    $exists = (new craft\db\Query())
        ->from('{{%backinstock_records}}')
        ->where(['email' => $email, 'variantId' => $variant->id])
        ->exists();

    if (!$exists) {
        Craft::$app->getDb()->createCommand()->insert('{{%backinstock_records}}', [
            'email' => $email,
            'variantId' => $variant->id,
            'locale' => 'en-AU',
            'options' => Json::encode(['colour' => 'Oatmeal', 'size' => 'Large']),
            'isNotified' => $notified,
            'dateCreated' => $created,
            'dateUpdated' => $created,
            'uid' => craft\helpers\StringHelper::UUID(),
        ])->execute();
    }
}

$templateDir = Craft::getAlias('@templates') . '/back-in-stock-preview';
FileHelper::createDirectory($templateDir);

$formTemplate = <<<'TWIG'
{# craft-screenshots: sample-frontend #}
{% set variant = craft.variants().sku('HLT-OAT-L').one() %}
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Harbour linen throw</title>
    <style>
        * { box-sizing: border-box; }
        body { margin: 0; padding: 56px; background: #f2f0eb; color: #22342f; font-family: Arial, Helvetica, sans-serif; }
        .card { display: grid; grid-template-columns: 44% 56%; width: 980px; min-height: 520px; margin: 0 auto; overflow: hidden; border-radius: 24px; background: #fff; box-shadow: 0 24px 70px rgba(34, 52, 47, .14); }
        .art { position: relative; display: grid; place-items: center; background: linear-gradient(145deg, #dfe7e2, #b9c9c0); }
        .throw { width: 250px; height: 320px; border-radius: 8px 8px 32px 8px; background: repeating-linear-gradient(90deg, #d9cbb7 0 22px, #e7ddcf 22px 44px); box-shadow: 0 24px 46px rgba(34, 52, 47, .18); transform: rotate(-5deg); }
        .details { display: flex; flex-direction: column; justify-content: center; padding: 60px 64px; }
        .eyebrow { margin-bottom: 18px; color: #698078; font-size: 12px; font-weight: 800; letter-spacing: .16em; text-transform: uppercase; }
        h1 { margin: 0 0 14px; font-family: Georgia, serif; font-size: 48px; font-weight: 500; letter-spacing: -.035em; line-height: 1.05; }
        .variant { margin: 0 0 30px; color: #61716c; font-size: 16px; }
        .status { display: inline-flex; align-items: center; gap: 8px; align-self: flex-start; margin-bottom: 34px; padding: 8px 12px; border-radius: 999px; background: #fbe8e5; color: #a2463b; font-size: 12px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; }
        .status::before { width: 8px; height: 8px; border-radius: 50%; background: #ca5749; content: ''; }
        label { display: block; margin-bottom: 9px; font-size: 14px; font-weight: 700; }
        .row { display: flex; gap: 10px; }
        input { flex: 1; min-width: 0; padding: 15px 16px; border: 1px solid #bac7c2; border-radius: 8px; color: #22342f; font: inherit; }
        button { padding: 15px 20px; border: 0; border-radius: 8px; background: #176b59; color: #fff; font: inherit; font-weight: 700; }
        .fine { margin: 14px 0 0; color: #788681; font-size: 12px; line-height: 1.5; }
    </style>
</head>
<body>
    <main class="card">
        <section class="art" aria-label="Oatmeal linen throw"><div class="throw"></div></section>
        <section class="details">
            <div class="eyebrow">Verbb &amp; Co. homewares</div>
            <h1>{{ variant.product.title }}</h1>
            <p class="variant">Oatmeal · Large · ${{ variant.price|number_format(2) }}</p>
            <div class="status">Temporarily sold out</div>
            <form method="post">
                {{ csrfInput() }}
                {{ actionInput('craft-commerce-back-in-stock/base/register-interest') }}
                {{ hiddenInput('variantId', variant.id) }}
                {{ hiddenInput('options', { colour: 'Oatmeal', size: 'Large' }|json_encode) }}
                <label for="back-in-stock-email">Email me when this exact option is back</label>
                <div class="row"><input id="back-in-stock-email" name="email" type="email" value="maya.chen@example.com"><button type="submit">Notify me</button></div>
            </form>
            <p class="fine">One useful email when Oatmeal / Large is available again. No marketing.</p>
        </section>
    </main>
</body>
</html>
TWIG;

$emailTemplate = <<<'TWIG'
{# craft-screenshots: sample-frontend #}
{% set variant = craft.variants().sku('HLT-OAT-L').one() %}
{% include 'back-in-stock-preview/_notification' with {
    variant: variant,
    subject: 'Harbour linen throw is back in stock'
} only %}
TWIG;

file_put_contents($templateDir . '/form.twig', $formTemplate);
file_put_contents($templateDir . '/email.twig', $emailTemplate);
$pluginRoot = dirname((new ReflectionClass(BackInStock::class))->getFileName());
file_put_contents($templateDir . '/_notification.twig', file_get_contents($pluginRoot . '/templates/emails/notification.html'));

echo Json::encode([
    'formRoute' => '/back-in-stock-preview/form',
    'logsRoute' => '/admin/back-in-stock/logs',
    'emailRoute' => '/back-in-stock-preview/email',
    'requestCount' => (int)(new craft\db\Query())->from('{{%backinstock_records}}')->count(),
], JSON_THROW_ON_ERROR);
