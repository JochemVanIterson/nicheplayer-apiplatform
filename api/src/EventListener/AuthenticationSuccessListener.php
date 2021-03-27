<?php

namespace App\EventListener;

use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use Symfony\Component\HttpFoundation\RequestStack;
use App\Entity\User;
use Vich\UploaderBundle\Storage\StorageInterface;

class AuthenticationSuccessListener
{
	/**
	 * @var RequestStack
	 */
	private $requestStack;

	/**
	 * @param RequestStack $requestStack
	 */
	public function __construct(RequestStack $requestStack, StorageInterface $storage)
	{
		$this->requestStack = $requestStack;
        $this->storage = $storage;
	}

	/**
     * @param AuthenticationSuccessEvent $event
     */
    public function onAuthenticationSuccessResponse(AuthenticationSuccessEvent $event)
    {
        $data = $event->getData();
        $user = $event->getUser();

        // if (!$user instanceof UserInterface) {
        //     return;
        // }

        $data['data'] = array(
            'id' => $user->getId(),
            'roles' => $user->getRoles(),
            'username' => $user->getUsername(),
            'firstname' => $user->getFirstname(),
            'lastname' => $user->getLastname(),
            'fullname' => $user->getFullname(),
            'email' => $user->getEmail(),
            'profilepic' => $user->getProfilepic(),
            'profilepicURL' => $this->storage->resolveUri($user->getProfilepic(), 'file')
        );

        $event->setData($data);
    }
}
