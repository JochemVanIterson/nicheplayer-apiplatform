<?php

namespace App\EventListener;

use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use Symfony\Component\HttpFoundation\RequestStack;
use App\Entity\User;

class AuthenticationSuccessListener
{
	/**
	 * @var RequestStack
	 */
	private $requestStack;

	/**
	 * @param RequestStack $requestStack
	 */
	public function __construct(RequestStack $requestStack)
	{
		$this->requestStack = $requestStack;
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
            'username' => $user->getUsername(),
            'firstname' => $user->getFirstname(),
            'lastname' => $user->getLastname(),
            'fullname' => $user->getFullname(),
            'email' => $user->getEmail(),
            'profilepicID' =>$user->getProfilepic()->getId(),
            'profilepic' =>$user->getProfilepic()->generateURL()
        );

        $event->setData($data);
    }
}
