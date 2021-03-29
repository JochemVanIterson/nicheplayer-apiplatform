<?php

namespace App\EventListener;

use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpFoundation\Cookie;
use App\Entity\User;
use Vich\UploaderBundle\Storage\StorageInterface;

class AuthenticationSuccessListener
{
    /**
     * @var int
     */
    private $tokenLifetime;

	/**
	 * @var RequestStack
	 */
	private $requestStack;

	/**
	 * @param RequestStack $requestStack
	 */
	public function __construct(RequestStack $requestStack, StorageInterface $storage, int $tokenLifetime)
	{
		$this->requestStack = $requestStack;
        $this->storage = $storage;
        $this->tokenLifetime = $tokenLifetime;
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

        $event->getResponse()->headers->setCookie(
            new Cookie(
                'BEARER', // Cookie name, should be the same as in config/packages/lexik_jwt_authentication.yaml.
                $data['token'], // cookie value
                time() + $this->tokenLifetime, // expiration
                '/', // path
                null, // domain, null means that Symfony will generate it on its own.
                true, // secure
                true, // httpOnly
                false, // raw
                'lax' // same-site parameter, can be 'lax' or 'strict'.
            )
        );
    }
}
