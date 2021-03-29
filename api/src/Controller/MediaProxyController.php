<?php

namespace App\Controller;

use App\Entity\MediaObject;
use App\Repository\MediaObjectRepository;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
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
        $access = $mediaObject->getAccess();

        if (!$access || $access == 'world') {

        }
        else if ($access == 'owner') {
            $user = $this->getUser();
            if(!$user || $user->getId() != $mediaObject->getOwner()->getId()) return new Response(null, 403);
        }
        else if ($access == 'login') {
            $this->denyAccessUnlessGranted('ROLE_USER');
        }
        else {
            return new Response('Access: '.$access);
        }

        return $downloadHandler->downloadObject($mediaObject, $fileField = 'file');
    }
    
}
