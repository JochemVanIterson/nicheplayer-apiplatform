<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\NfcRepository;
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
 *         "post"={
 *             "security"="is_granted('ROLE_ADMIN')",
 *             "route_name"="api_nfc_post"
 *         }
 *     },
 *     itemOperations={
 *         "get",
 *         "put"={"security"="is_granted('ROLE_ADMIN')"},
 *         "patch"={"security"="is_granted('ROLE_USER')"},
 *         "delete"={"security"="is_granted('ROLE_ADMIN')"}
 *     },
 * )
 * @ORM\Entity(repositoryClass=NfcRepository::class)
 * @ApiFilter(SearchFilter::class, properties = {"album" = "exact", "cardUID" = "exact", "users.id" = "exact"})
 * @ApiFilter(OrderFilter::class, properties = {"id", "cardUID", "album", "users"}, arguments = {"orderParameterName" = "order"})
 */
class Nfc
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=32)
     */
    private $cardUID;

    /**
     * @ORM\ManyToOne(targetEntity=Album::class, inversedBy="nfcs")
     * @ORM\JoinColumn(nullable=false)
     */
    private $album;

    /**
     * @ORM\ManyToMany(targetEntity=User::class, inversedBy="nfcs")
     */
    private $users;

    /**
     * @ORM\Column(type="integer")
     */
    private $scanCounter;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $lastScan;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $blocked;

    public function __construct()
    {
        $this->users = new ArrayCollection();
        $this->scanCounter = 0;
        $this->blocked = false;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCardUID(): ?string
    {
        return $this->cardUID;
    }

    public function setCardUID(string $cardUID): self
    {
        $this->cardUID = $cardUID;

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

    /**
     * @return Collection|User[]
     */
    public function getUsers(): Collection
    {
        return $this->users;
    }

    public function addUser(User $user): self
    {
        if (!$this->users->contains($user)) {
            $this->users[] = $user;
        }

        return $this;
    }

    public function removeUser(User $user): self
    {
        $this->users->removeElement($user);

        return $this;
    }

    public function getScanCounter(): ?int
    {
        return $this->scanCounter;
    }

    public function setScanCounter(int $scanCounter): self
    {
        $this->scanCounter = $scanCounter;

        return $this;
    }

    public function getLastScan(): ?\DateTimeInterface
    {
        return $this->lastScan;
    }

    public function setLastScan(\DateTimeInterface $lastScan): self
    {
        $this->lastScan = $lastScan;

        return $this;
    }

    public function getBlocked(): ?bool
    {
        return $this->blocked;
    }

    public function setBlocked(?bool $blocked): self
    {
        $this->blocked = $blocked;

        return $this;
    }
}
