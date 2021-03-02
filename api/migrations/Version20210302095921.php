<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210302095921 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE album (id INT AUTO_INCREMENT NOT NULL, album_art_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, artist VARCHAR(255) NOT NULL, release_date DATE DEFAULT NULL, INDEX IDX_39986E435E5ED8AD (album_art_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE play_history (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, song_id INT NOT NULL, timestamp DATETIME NOT NULL, duration INT NOT NULL, INDEX IDX_51A417FBA76ED395 (user_id), INDEX IDX_51A417FBA0BDB2F3 (song_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE song (id INT AUTO_INCREMENT NOT NULL, file_id INT NOT NULL, name VARCHAR(255) NOT NULL, song_artist VARCHAR(255) DEFAULT NULL, duration INT DEFAULT NULL, INDEX IDX_33EDEEA193CB796C (file_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE album ADD CONSTRAINT FK_39986E435E5ED8AD FOREIGN KEY (album_art_id) REFERENCES media (id)');
        $this->addSql('ALTER TABLE play_history ADD CONSTRAINT FK_51A417FBA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE play_history ADD CONSTRAINT FK_51A417FBA0BDB2F3 FOREIGN KEY (song_id) REFERENCES song (id)');
        $this->addSql('ALTER TABLE song ADD CONSTRAINT FK_33EDEEA193CB796C FOREIGN KEY (file_id) REFERENCES media (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE play_history DROP FOREIGN KEY FK_51A417FBA0BDB2F3');
        $this->addSql('DROP TABLE album');
        $this->addSql('DROP TABLE play_history');
        $this->addSql('DROP TABLE song');
    }

    public function isTransactional(): bool
    {
        return false;
    }
}
