<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\AlbumRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ApiResource(
 *     attributes={
 *         "security"="is_granted('ROLE_USER')",
 *         "pagination_client_items_per_page"=true
 *     },
 *     collectionOperations={
 *         "get",
 *         "post"={"security"="is_granted('ROLE_ADMIN')"}
 *     },
 *     itemOperations={
 *         "get",
 *         "put"={"security"="is_granted('ROLE_ADMIN')"}
 *     },
 * )
 * @ORM\Entity(repositoryClass=AlbumRepository::class)
 * @ApiFilter(OrderFilter::class, properties = {"id", "name", "artist", "releaseDate"}, arguments = {"orderParameterName" = "order"})
 */
class Album
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
     * @ORM\Column(type="string", length=255)
     */
    #[Assert\NotBlank]
    private $artist;

    /**
     * @ORM\Column(type="date", nullable=true)
     */
    private $releaseDate;

    /**
     * @ORM\ManyToOne(targetEntity=MediaObject::class)
     */
    private $albumArt;

    /**
     * @ORM\OneToMany(targetEntity=Song::class, mappedBy="album")
     */
    private $songs;

    /**
     * @ORM\Column(type="float", nullable=true)
     */
    private $price;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $currency;

    /**
     * @ORM\OneToMany(targetEntity=Nfc::class, mappedBy="album")
     */
    private $nfcs;

    public function __construct()
    {
        $this->songs = new ArrayCollection();
        $this->nfcs = new ArrayCollection();
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

    public function getArtist(): ?string
    {
        return $this->artist;
    }

    public function setArtist(string $artist): self
    {
        $this->artist = $artist;

        return $this;
    }

    public function getReleaseDate(): ?\DateTimeInterface
    {
        return $this->releaseDate;
    }

    public function setReleaseDate(?\DateTimeInterface $releaseDate): self
    {
        $this->releaseDate = $releaseDate;

        return $this;
    }

    public function getAlbumArt(): ?MediaObject
    {
        return $this->albumArt;
    }

    public function setAlbumArt(?MediaObject $albumArt): self
    {
        $this->albumArt = $albumArt;

        return $this;
    }

    /**
     * @return Collection|Song[]
     */
    public function getSongs(): Collection
    {
        return $this->songs;
    }

    public function addSong(Song $song): self
    {
        if (!$this->songs->contains($song)) {
            $this->songs[] = $song;
            $song->setAlbum($this);
        }

        return $this;
    }

    public function removeSong(Song $song): self
    {
        if ($this->songs->removeElement($song)) {
            // set the owning side to null (unless already changed)
            if ($song->getAlbum() === $this) {
                $song->setAlbum(null);
            }
        }

        return $this;
    }

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(?float $price): self
    {
        $this->price = $price;

        return $this;
    }

    public function getCurrency(): ?string
    {
        return $this->currency;
    }

    public function setCurrency(?string $currency): self
    {
        $this->currency = $currency;

        return $this;
    }

    /**
     * @return Collection|Nfc[]
     */
    public function getNfcs(): Collection
    {
        return $this->nfcs;
    }

    public function addNfc(Nfc $nfc): self
    {
        if (!$this->nfcs->contains($nfc)) {
            $this->nfcs[] = $nfc;
            $nfc->setAlbum($this);
        }

        return $this;
    }

    public function removeNfc(Nfc $nfc): self
    {
        if ($this->nfcs->removeElement($nfc)) {
            // set the owning side to null (unless already changed)
            if ($nfc->getAlbum() === $this) {
                $nfc->setAlbum(null);
            }
        }

        return $this;
    }
}
