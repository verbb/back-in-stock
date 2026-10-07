# Testing

The default test suite runs quickly against the plugin checkout:

```sh
composer test
```

The integration suite uses a dedicated DDEV project to create a clean Craft CMS and Craft Commerce installation before running Pest:

```sh
ddev test
ddev test --filter='selects waiting subscribers'
```

The generated application lives under `.cache/verbb-tests` and is recreated on every run. Dependencies are cached between runs, but the database, Craft configuration, storage, and installed plugins start clean. The runner refuses to operate outside the DDEV project named in `tests/runtime/suite.json`, so it cannot reset another Craft installation.

Integration tests use the real plugin installation, database records, Commerce products and inventory service. Outgoing messages are cancelled through the plugin's event before reaching a mail transport.
