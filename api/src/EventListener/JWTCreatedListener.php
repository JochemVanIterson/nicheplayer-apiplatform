<?php

namespace App\EventListener;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;
use Symfony\Component\HttpFoundation\RequestStack;
use App\Entity\User;
class JWTCreatedListener
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
	 * @param JWTCreatedEvent $event
	 *
	 * @return void
	 */
	public function onJWTCreated(JWTCreatedEvent $event)
	{
		$request = $this->requestStack->getCurrentRequest();

		$payload = $event->getData();

		$payload['ip'] = $request->getClientIp();

		$event->setData($payload);

		$header = $event->getHeader();
		$header['cty'] = 'JWT';

		$event->setHeader($header);
	}
}