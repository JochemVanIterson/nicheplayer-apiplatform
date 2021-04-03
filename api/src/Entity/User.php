<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

/**
 * @ApiResource(
 *     attributes={
 *         "security"="is_granted('ROLE_USER')",
 *         "pagination_client_items_per_page"=true
 *     },
 *     collectionOperations={
 *         "get"={
 *             "normalization_context"= {"groups" = {"get"}}
 *         },
 *         "post"={
 *             "security"="is_granted('IS_AUTHENTICATED_ANONYMOUSLY')",
 *             "route_name"="api_users_post"
 *         }
 *     },
 *     itemOperations={
 *         "delete"={"security"="is_granted('ROLE_ADMIN')"},
 *         "get"={
 *             "normalization_context"= {"groups" = {"get"}}
 *         },
 *         "put"={
 *             "security"="is_granted('ROLE_USER')",
 *             "route_name"="api_users_put"
 *         }
 *     }
 * )
 * @ApiFilter(OrderFilter::class, properties = {"id", "firstname", "lastname", "username", "email"}, arguments = {"orderParameterName" = "order"})
 * @ORM\Entity(repositoryClass=UserRepository::class)
 */
class User implements UserInterface
{
    private $passwordEncoder;
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"get"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     * @Groups({"get"})
     */
    #[Assert\NotBlank]
    private $username;

    /**
     * @ORM\Column(type="json")
     * @Groups({"get"})
     */
    private $roles = [];

    /**
     * @var string The hashed password
     * @ORM\Column(type="string")
     */
    #[Assert\NotBlank]
    private $password;

    /**
     * @ORM\Column(type="string", length=255, unique=true)
     * @Groups({"get"})
     */
    private $email;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"get"})
     */
    private $firstname;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"get"})
     */
    private $lastname;

    /**
     * @ORM\ManyToOne(targetEntity=MediaObject::class)
     * @Groups({"get"})
     */
    private $profilepic;

    /**
     * @ORM\OneToMany(targetEntity=PlayHistory::class, mappedBy="user")
     */
    private $playHistory;

    /**
     * @ORM\OneToMany(targetEntity=Payment::class, mappedBy="user")
     */
    private $payments;

    public function __construct()
    {
        $this->playHistory = new ArrayCollection();
        $this->payments = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUsername(): string
    {
        return (string) $this->username;
    }

    public function setUsername(string $username): self
    {
        $this->username = $username;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getPassword(): string
    {
        return (string) $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Returning a salt is only needed, if you are not using a modern
     * hashing algorithm (e.g. bcrypt or sodium) in your security.yaml.
     *
     * @see UserInterface
     */
    public function getSalt(): ?string
    {
        return null;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(?string $firstname): self
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(?string $lastname): self
    {
        $this->lastname = $lastname;

        return $this;
    }

    public function getFullname(): ?string
    {
        return $this->getFirstname()." ".$this->getLastname();
    }

    public function getProfilepic(): ?MediaObject
    {
        return $this->profilepic;
    }

    public function setProfilepic(?MediaObject $profilepic): self
    {
        $this->profilepic = $profilepic;

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
            $playHistory->setUser($this);
        }

        return $this;
    }

    public function removePlayHistory(PlayHistory $playHistory): self
    {
        if ($this->playHistory->removeElement($playHistory)) {
            // set the owning side to null (unless already changed)
            if ($playHistory->getUser() === $this) {
                $playHistory->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Payment[]
     */
    public function getPayments(): Collection
    {
        return $this->payments;
    }

    public function addPayment(Payment $payment): self
    {
        if (!$this->payments->contains($payment)) {
            $this->payments[] = $payment;
            $payment->setUser($this);
        }

        return $this;
    }

    public function removePayment(Payment $payment): self
    {
        if ($this->payments->removeElement($payment)) {
            // set the owning side to null (unless already changed)
            if ($payment->getUser() === $this) {
                $payment->setUser(null);
            }
        }

        return $this;
    }
}
