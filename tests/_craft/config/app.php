<?php

return [
    'components' => [
        'projectConfig' => function() {
            $config = craft\helpers\App::projectConfigConfig();
            $config['writeYamlAutomatically'] = false;

            return Craft::createObject($config);
        },
    ],
];
