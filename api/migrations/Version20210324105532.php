<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210324105532 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE payment (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, album_id INT DEFAULT NULL, song_id INT DEFAULT NULL, type VARCHAR(255) NOT NULL, payment_status VARCHAR(255) NOT NULL, datetime DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL, price DOUBLE PRECISION DEFAULT NULL, INDEX IDX_6D28840DA76ED395 (user_id), INDEX IDX_6D28840D1137ABCF (album_id), INDEX IDX_6D28840DA0BDB2F3 (song_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE payment ADD CONSTRAINT FK_6D28840DA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE payment ADD CONSTRAINT FK_6D28840D1137ABCF FOREIGN KEY (album_id) REFERENCES album (id)');
        $this->addSql('ALTER TABLE payment ADD CONSTRAINT FK_6D28840DA0BDB2F3 FOREIGN KEY (song_id) REFERENCES song (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE payment');
    }

    public function isTransactional(): bool
    {
        return false;
    }
}
