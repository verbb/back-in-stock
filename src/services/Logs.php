<?php
namespace verbb\backinstock\services;

use verbb\backinstock\events\LogEvent;
use verbb\backinstock\models\Log;
use verbb\backinstock\records\Log as LogRecord;

use Craft;
use craft\base\MemoizableArray;
use craft\db\Query;
use craft\helpers\ArrayHelper;
use craft\helpers\Json;

use yii\base\Component;
use yii\db\IntegrityException;

use Exception;
use Throwable;

class Logs extends Component
{
    // Constants
    // =========================================================================

    public const EVENT_BEFORE_SAVE_LOG = 'beforeSaveLog';
    public const EVENT_AFTER_SAVE_LOG = 'afterSaveLog';
    public const EVENT_BEFORE_DELETE_LOG = 'beforeDeleteLog';
    public const EVENT_AFTER_DELETE_LOG = 'afterDeleteLog';


    // Properties
    // =========================================================================

    private ?MemoizableArray $_logs = null;


    // Public Methods
    // =========================================================================

    public function getAllLogs(): array
    {
        return $this->_logs()->all();
    }

    public function saveLog(Log $log, bool $runValidation = true): bool
    {
        $isNewLog = !$log->id;
        $log->siteId ??= Craft::$app->getSites()->getCurrentSite()->id;

        // Fire a 'beforeSaveLog' event
        if ($this->hasEventHandlers(self::EVENT_BEFORE_SAVE_LOG)) {
            $this->trigger(self::EVENT_BEFORE_SAVE_LOG, new LogEvent([
                'log' => $log,
                'isNew' => $isNewLog,
            ]));
        }

        if ($runValidation && !$log->validate()) {
            Craft::info('Log not saved due to validation error.', __METHOD__);
            return false;
        }

        $logRecord = $this->_getLogRecordById($log->id);
        $logRecord->email = $log->getEmail();
        $logRecord->variantId = $log->variantId;
        $logRecord->siteId = $log->siteId;
        $logRecord->locale = $log->locale;
        $logRecord->options = $log->options;
        $logRecord->isNotified = $log->isNotified;
        $logRecord->pendingKey = $log->getPendingIdentityKey();

        try {
            $logRecord->save(false);
        } catch (IntegrityException $e) {
            if ($isNewLog && $logRecord->pendingKey && $this->_isDuplicateKeyException($e) && LogRecord::find()->where(['pendingKey' => $logRecord->pendingKey])->exists()) {
                $log->addError('variantId', Craft::t('craft-commerce-back-in-stock', 'Your email is already subscribed to receive updates for this product.'));
                return false;
            }

            throw $e;
        }

        if (!$log->id) {
            $log->id = $logRecord->id;
        }

        // Fire an 'afterSaveLog' event
        if ($this->hasEventHandlers(self::EVENT_AFTER_SAVE_LOG)) {
            $this->trigger(self::EVENT_AFTER_SAVE_LOG, new LogEvent([
                'log' => $log,
                'isNew' => $isNewLog,
            ]));
        }

        return true;
    }


    // Private Methods
    // =========================================================================

    private function _logs(): MemoizableArray
    {
        if (!isset($this->_logs)) {
            $this->_logs = new MemoizableArray(
                $this->_createLogQuery()->all(),
                fn(array $result) => new Log($result),
            );
        }

        return $this->_logs;
    }

    private function _createLogQuery(): Query
    {
        return (new Query())
            ->select([
                'id',
                'email',
                'variantId',
                'siteId',
                'locale',
                'options',
                'isNotified',
                'pendingKey',
                'dateCreated',
                'dateUpdated',
                'uid',
            ])
            ->from(['{{%backinstock_records}}']);
    }

    private function _getLogRecordById(int $logId = null): ?LogRecord
    {
        if ($logId !== null) {
            $logRecord = LogRecord::findOne(['id' => $logId]);

            if (!$logRecord) {
                throw new Exception(Craft::t('craft-commerce-back-in-stock', 'No log exists with the ID “{id}”.', ['id' => $logId]));
            }
        } else {
            $logRecord = new LogRecord();
        }

        return $logRecord;
    }

    private function _isDuplicateKeyException(IntegrityException $exception): bool
    {
        $sqlState = $exception->errorInfo[0] ?? null;
        $driverCode = (int)($exception->errorInfo[1] ?? 0);

        return $sqlState === '23505' || ($sqlState === '23000' && $driverCode === 1062);
    }

}
