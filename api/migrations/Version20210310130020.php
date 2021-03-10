<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210310130020 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE album (id INT AUTO_INCREMENT NOT NULL, album_art_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, artist VARCHAR(255) NOT NULL, release_date DATE DEFAULT NULL, INDEX IDX_39986E435E5ED8AD (album_art_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE greeting (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE media (id INT AUTO_INCREMENT NOT NULL, source_id INT NOT NULL, meta JSON DEFAULT NULL, file_path VARCHAR(255) DEFAULT NULL, INDEX IDX_6A2CA10C953C1C61 (source_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE play_history (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, song_id INT NOT NULL, timestamp DATETIME NOT NULL, duration INT NOT NULL, INDEX IDX_51A417FBA76ED395 (user_id), INDEX IDX_51A417FBA0BDB2F3 (song_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE song (id INT AUTO_INCREMENT NOT NULL, file_id INT NOT NULL, album_id INT NOT NULL, name VARCHAR(255) NOT NULL, song_artist VARCHAR(255) DEFAULT NULL, duration INT DEFAULT NULL, INDEX IDX_33EDEEA193CB796C (file_id), INDEX IDX_33EDEEA11137ABCF (album_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE source (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, type VARCHAR(32) NOT NULL, config JSON NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, profilepic_id INT DEFAULT NULL, username VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, firstname VARCHAR(255) DEFAULT NULL, lastname VARCHAR(255) DEFAULT NULL, UNIQUE INDEX UNIQ_8D93D649F85E0677 (username), UNIQUE INDEX UNIQ_8D93D649E7927C74 (email), INDEX IDX_8D93D649E3BD8EDF (profilepic_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE album ADD CONSTRAINT FK_39986E435E5ED8AD FOREIGN KEY (album_art_id) REFERENCES media (id)');
        $this->addSql('ALTER TABLE media ADD CONSTRAINT FK_6A2CA10C953C1C61 FOREIGN KEY (source_id) REFERENCES source (id)');
        $this->addSql('ALTER TABLE play_history ADD CONSTRAINT FK_51A417FBA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE play_history ADD CONSTRAINT FK_51A417FBA0BDB2F3 FOREIGN KEY (song_id) REFERENCES song (id)');
        $this->addSql('ALTER TABLE song ADD CONSTRAINT FK_33EDEEA193CB796C FOREIGN KEY (file_id) REFERENCES media (id)');
        $this->addSql('ALTER TABLE song ADD CONSTRAINT FK_33EDEEA11137ABCF FOREIGN KEY (album_id) REFERENCES album (id)');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D649E3BD8EDF FOREIGN KEY (profilepic_id) REFERENCES media (id)');

        // Insert local source
        $config = '{ \"path\": \"%kernel.project_dir%/public/media/\" }';
        $this->addSql('INSERT INTO source (id, name, type, config) VALUES (1, "local", "LOCAL", "'.$config.'")');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE song DROP FOREIGN KEY FK_33EDEEA11137ABCF');
        $this->addSql('ALTER TABLE album DROP FOREIGN KEY FK_39986E435E5ED8AD');
        $this->addSql('ALTER TABLE song DROP FOREIGN KEY FK_33EDEEA193CB796C');
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D649E3BD8EDF');
        $this->addSql('ALTER TABLE play_history DROP FOREIGN KEY FK_51A417FBA0BDB2F3');
        $this->addSql('ALTER TABLE media DROP FOREIGN KEY FK_6A2CA10C953C1C61');
        $this->addSql('ALTER TABLE play_history DROP FOREIGN KEY FK_51A417FBA76ED395');
        $this->addSql('DROP TABLE album');
        $this->addSql('DROP TABLE greeting');
        $this->addSql('DROP TABLE media');
        $this->addSql('DROP TABLE play_history');
        $this->addSql('DROP TABLE song');
        $this->addSql('DROP TABLE source');
        $this->addSql('DROP TABLE user');
    }
}
