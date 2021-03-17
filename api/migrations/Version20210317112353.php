<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210317112353 extends AbstractMigration
{
    public function getDescription() : string
    {
        return 'Extract columns from meta json';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE media_object ADD mime VARCHAR(128), ADD type VARCHAR(32), ADD size INT DEFAULT 0, ADD file_name VARCHAR(255) DEFAULT NULL');
        $this->addSql('UPDATE media_object
            SET mime = CASE
                WHEN JSON_EXTRACT(meta, \'$.mime\') IS NOT NULL THEN JSON_UNQUOTE(JSON_EXTRACT(meta, \'$.mime\'))
                ELSE \'unknown\'
            END
        WHERE mime IS NULL');
        $this->addSql('UPDATE media_object
            SET type = CASE
                WHEN JSON_EXTRACT(meta, \'$.type\') IS NOT NULL THEN JSON_UNQUOTE(JSON_EXTRACT(meta, \'$.type\'))
                ELSE \'unknown\'
            END
        WHERE type IS NULL');
        $this->addSql('UPDATE media_object
            SET size = CASE
                WHEN JSON_EXTRACT(meta, \'$.size\') IS NOT NULL THEN JSON_UNQUOTE(JSON_EXTRACT(meta, \'$.size\'))
                ELSE 0
            END');
        $this->addSql('UPDATE media_object
            SET file_name = SUBSTRING(file_path, LOCATE(\'_\', file_path)+1)
        WHERE file_name IS NULL');
        $this->addSql('ALTER TABLE media_object MODIFY mime VARCHAR(128) NOT NULL, MODIFY type VARCHAR(32) NOT NULL');
        $this->addSql('ALTER TABLE media_object RENAME INDEX idx_6a2ca10c953c1c61 TO IDX_14D43132953C1C61');
        $this->addSql('UPDATE media_object SET meta = JSON_REMOVE(meta, \'$.mime\', \'$.type\', \'$.size\')');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('UPDATE media_object SET meta = JSON_SET(meta, \'$.mime\', mime)');
        $this->addSql('UPDATE media_object SET meta = JSON_SET(meta, \'$.type\', type)');
        $this->addSql('UPDATE media_object SET meta = JSON_SET(meta, \'$.size\', size)');

        $this->addSql('ALTER TABLE media_object DROP mime, DROP type, DROP size, DROP file_name');
        $this->addSql('ALTER TABLE media_object RENAME INDEX idx_14d43132953c1c61 TO IDX_6A2CA10C953C1C61');
    }

    public function isTransactional(): bool
    {
        return false;
    }
}
