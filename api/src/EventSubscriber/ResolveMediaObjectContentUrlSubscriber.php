<?php
// api/src/EventSubscriber/ResolveMediaObjectContentUrlSubscriber.php

namespace App\EventSubscriber;

use ApiPlatform\Core\EventListener\EventPriorities;
use ApiPlatform\Core\Util\RequestAttributesExtractor;
use App\Entity\MediaObject;
use App\Entity\User;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Vich\UploaderBundle\Storage\StorageInterface;

final class ResolveMediaObjectContentUrlSubscriber implements EventSubscriberInterface
{
    private $storage;

    public function __construct(StorageInterface $storage)
    {
        $this->storage = $storage;
    }

    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::VIEW => ['onPreSerialize', EventPriorities::PRE_SERIALIZE],
        ];
    }

    public function onPreSerialize(ViewEvent $event): void
    {
        $controllerResult = $event->getControllerResult();
        $request = $event->getRequest();

        if ($controllerResult instanceof Response || !$request->attributes->getBoolean('_api_respond', true)) {
            return;
        }
        $attributes = RequestAttributesExtractor::extractAttributes($request);
        if (
            !($attributes) ||
            !(
                \is_a($attributes['resource_class'], MediaObject::class, true) ||
                \is_a($attributes['resource_class'], User::class, true)
            )
        ) {
            return;
        }

        $objects = $controllerResult;

        if (!is_iterable($objects)) {
            $objects = [$objects];
        }

        foreach ($objects as $object) {
            if ($object instanceof MediaObject) {
                $object->contentUrl = $this->storage->resolveUri($object, 'file');
            }
            else if ($object instanceof User && $object->getProfilepic() instanceof MediaObject) {
                $newProfilePic = $object->getProfilepic();
                $newProfilePic->contentUrl = $this->storage->resolveUri($object->getProfilepic(), 'file');
                $object->setProfilepic($newProfilePic);
            }
        }
    }
}