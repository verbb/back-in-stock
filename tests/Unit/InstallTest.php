<?php
namespace verbb\backinstock\tests\Unit;

use verbb\backinstock\migrations\Install;

use craft\db\Connection;

use PHPUnit\Framework\TestCase;

class InstallTest extends TestCase
{
    public function testUninstallRemovesEveryDeclaredForeignKeyBeforeDroppingTables(): void
    {
        $db = $this->createMock(Connection::class);
        $db->method('tableExists')->willReturn(true);

        $migration = $this->getMockBuilder(Install::class)
            ->disableOriginalConstructor()
            ->onlyMethods(['addForeignKey', 'dropForeignKeyIfExists', 'dropTableIfExists'])
            ->getMock();
        $migration->db = $db;

        $foreignKeys = [];
        $migration->method('addForeignKey')->willReturnCallback(
            static function($name, $table, $columns, $refTable) use (&$foreignKeys): void {
                $foreignKeys[$table][implode(',', (array)$columns)] = $refTable;
            }
        );
        $migration->method('dropForeignKeyIfExists')->willReturnCallback(
            static function($table, $columns) use (&$foreignKeys): void {
                unset($foreignKeys[$table][implode(',', (array)$columns)]);
            }
        );
        $migration->expects(self::exactly(4))->method('dropTableIfExists')->willReturnCallback(
            static function($table) use (&$foreignKeys): void {
                self::assertEmpty($foreignKeys[$table] ?? [], 'The table still has outgoing foreign keys.');

                foreach ($foreignKeys as $references) {
                    self::assertNotContains($table, $references, 'Another table still references the table being dropped.');
                }
            }
        );

        // Derive the expected cleanup from the install schema so new relationships remain covered.
        $migration->createForeignKeys();
        self::assertNotEmpty($foreignKeys);
        self::assertTrue($migration->safeDown());
    }

    public function testForeignKeyCleanupSkipsMissingTables(): void
    {
        $db = $this->createMock(Connection::class);
        $db->method('tableExists')->willReturn(false);

        $migration = $this->getMockBuilder(Install::class)
            ->disableOriginalConstructor()
            ->onlyMethods(['dropForeignKeyIfExists'])
            ->getMock();
        $migration->db = $db;
        $migration->expects(self::never())->method('dropForeignKeyIfExists');

        $migration->dropForeignKeys();
    }
}
