<?php

namespace App\Controller;

use App\Entity\MediaObject;
use App\Repository\MediaObjectRepository;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
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
        $this->denyAccessUnlessGranted('ROLE_USER');
        return $downloadHandler->downloadObject($mediaObject, $fileField = 'file');
    }
    
}
