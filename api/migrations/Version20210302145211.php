<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210302145211 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {        
        $config = '{ \"path\": \"%kernel.project_dir%/public/media\" }';

        $this->addSql('INSERT INTO source (id, name, type, config) VALUES (1, "local", "LOCAL", "'.$config.'")');
        // this up() migration is auto-generated, please modify it to your needs

    }

    public function down(Schema $schema) : void
    {
        $this->addSql('DELETE FROM source WHERE id = 1');
        // this down() migration is auto-generated, please modify it to your needs

    }
}
