<?php
// api/src/Controller/CreateMediaObjectAction.php

namespace App\Controller;

use App\Entity\Media;
use App\Entity\Source;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

final class CreateMediaObjectAction extends AbstractController
{
    public function __invoke(Request $request): Media
    {
        $uploadedFile = $request->files->get('file');
        if (!$uploadedFile) {
            throw new BadRequestHttpException('"file" is required');
        }

        $em = $this->getDoctrine()->getManager();
        $localSource = $em->getRepository(Source::class)->findOneBy(['name' => 'local']);
        if (!$localSource) {
            throw new BadRequestHttpException('localSource is empty');
        }

        $media = new Media();
        $media->file = $uploadedFile;
        $media->setSource($localSource);

        // TODO:
        // Do some metadata generation

        return $media;
    }
}