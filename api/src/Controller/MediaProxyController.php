<?php

namespace App\Controller;

use App\Entity\MediaObject;
use App\Repository\MediaObjectRepository;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Vich\UploaderBundle\Handler\DownloadHandler;

class MediaProxyController extends AbstractController
{
    /**
     * @Route(
     *     name="media_download_id",
     *     path="/api/media/{filePath}",
     *     methods={"GET"}
     * )
     */
    public function downloadByPath(MediaObject $mediaObject, DownloadHandler $downloadHandler): Response
    {
        return $downloadHandler->downloadObject($mediaObject, $fileField = 'file');
    }
    
}
