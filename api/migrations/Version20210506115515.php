<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210506115515 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE nfc (id INT AUTO_INCREMENT NOT NULL, album_id INT NOT NULL, card_uid VARCHAR(32) NOT NULL, scan_counter INT NOT NULL, last_scan DATETIME NOT NULL, INDEX IDX_5A14C3FB1137ABCF (album_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE nfc_user (nfc_id INT NOT NULL, user_id INT NOT NULL, INDEX IDX_D0D1388425DD09AB (nfc_id), INDEX IDX_D0D13884A76ED395 (user_id), PRIMARY KEY(nfc_id, user_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE nfc ADD CONSTRAINT FK_5A14C3FB1137ABCF FOREIGN KEY (album_id) REFERENCES album (id)');
        $this->addSql('ALTER TABLE nfc_user ADD CONSTRAINT FK_D0D1388425DD09AB FOREIGN KEY (nfc_id) REFERENCES nfc (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE nfc_user ADD CONSTRAINT FK_D0D13884A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE nfc_user DROP FOREIGN KEY FK_D0D1388425DD09AB');
        $this->addSql('DROP TABLE nfc');
        $this->addSql('DROP TABLE nfc_user');
    }

    public function isTransactional(): bool
    {
        return false;
    }
}
