<?php
// api/src/Controller/CreateMediaObjectAction.php

namespace App\Controller;

use App\Entity\MediaObject;
use App\Entity\Source;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\MediaParsers\ImageParser;
use App\MediaParsers\AudioParser;

final class CreateMediaObjectAction extends AbstractController
{
    public function __invoke(Request $request): MediaObject
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

        $media = new MediaObject();
        $media->file = $uploadedFile;
        $media->setSource($localSource);
        
        $media->setMime($uploadedFile->getMimeType());
        $media->setSize(filesize($uploadedFile->getPathname()));
        $media->setFileName($uploadedFile->getClientOriginalName());

        $mediaParser = null;
        if(ImageParser::isType($uploadedFile)){
            $media->setType("image");
            $mediaParser = new ImageParser($uploadedFile);
        } else if(AudioParser::isType($uploadedFile)){
            $media->setType("audio");
            $mediaParser = new AudioParser($uploadedFile);
        }

        if($mediaParser) $media->setMeta($mediaParser->generateMetadata());

        return $media;
    }
}