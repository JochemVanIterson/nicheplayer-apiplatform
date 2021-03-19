<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use App\Repository\SongRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ApiResource(
 *     attributes={"security"="is_granted('ROLE_USER')"},
 *     collectionOperations={
 *         "get",
 *         "post"={"security"="is_granted('ROLE_ADMIN')"}
 *     },
 *     itemOperations={
 *         "get",
 *         "put"={"security"="is_granted('ROLE_ADMIN')"}
 *     }
 * )
 * @ORM\Entity(repositoryClass=SongRepository::class)
 * @ApiFilter(OrderFilter::class, properties = {"id", "name", "trackNumber"}, arguments = {"orderParameterName" = "order"})
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
    #[Assert\NotBlank]
    private $name;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $songArtist;

    /**
     * @ORM\ManyToOne(targetEntity=MediaObject::class)
     * @ORM\JoinColumn(nullable=false)
     */
    #[Assert\NotNull]
    private $file;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $duration;

    /**
     * @ORM\OneToMany(targetEntity=PlayHistory::class, mappedBy="song")
     */
    private $playHistory;

    /**
     * @ORM\ManyToOne(targetEntity=Album::class, inversedBy="songs")
     * @ORM\JoinColumn(nullable=false)
     */
    private $album;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $trackNumber;

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

    public function getFile(): ?MediaObject
    {
        return $this->file;
    }

    public function setFile(?MediaObject $file): self
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

    public function getAlbum(): ?Album
    {
        return $this->album;
    }

    public function setAlbum(?Album $album): self
    {
        $this->album = $album;

        return $this;
    }

    public function getTrackNumber(): ?int
    {
        return $this->trackNumber;
    }

    public function setTrackNumber(?int $trackNumber): self
    {
        $this->trackNumber = $trackNumber;

        return $this;
    }
}
