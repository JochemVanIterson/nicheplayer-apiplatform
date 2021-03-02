<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\SongRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass=SongRepository::class)
 */
class Song
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $songArtist;

    /**
     * @ORM\ManyToOne(targetEntity=Media::class)
     * @ORM\JoinColumn(nullable=false)
     */
    private $file;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $duration;

    /**
     * @ORM\OneToMany(targetEntity=PlayHistory::class, mappedBy="song")
     */
    private $playHistory;

    public function __construct()
    {
        $this->playHistory = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getSongArtist(): ?string
    {
        return $this->songArtist;
    }

    public function setSongArtist(?string $songArtist): self
    {
        $this->songArtist = $songArtist;

        return $this;
    }

    public function getFile(): ?Media
    {
        return $this->file;
    }

    public function setFile(?Media $file): self
    {
        $this->file = $file;

        return $this;
    }

    public function getDuration(): ?int
    {
        return $this->duration;
    }

    public function setDuration(?int $duration): self
    {
        $this->duration = $duration;

        return $this;
    }

    /**
     * @return Collection|PlayHistory[]
     */
    public function getPlayHistory(): Collection
    {
        return $this->playHistory;
    }

    public function addPlayHistory(PlayHistory $playHistory): self
    {
        if (!$this->playHistory->contains($playHistory)) {
            $this->playHistory[] = $playHistory;
            $playHistory->setSong($this);
        }

        return $this;
    }

    public function removePlayHistory(PlayHistory $playHistory): self
    {
        if ($this->playHistory->removeElement($playHistory)) {
            // set the owning side to null (unless already changed)
            if ($playHistory->getSong() === $this) {
                $playHistory->setSong(null);
            }
        }

        return $this;
    }
}
