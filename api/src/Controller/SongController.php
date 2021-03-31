<?php

namespace App\Controller;

use App\Entity\Song;
use App\Entity\MediaObject;
use App\Entity\User;
use App\Entity\Payment;
use App\Entity\PlayHistory;

use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

use Vich\UploaderBundle\Handler\DownloadHandler;


class SongController extends AbstractController
{
    /**
     * @Route(
     *     name="song_play_id",
     *     path="/api/play/{id}",
     *     methods={"GET"}
     * )
     */
    public function playSong(Request $request, Song $song, DownloadHandler $downloadHandler): Response
    {
        $user = $this->getUser();
        $album = $song->getAlbum();
        $payment = $this->getDoctrine()
            ->getRepository(Payment::class)
            ->findOneBy([
                "user" => $user,
                "album" => $album,
                "paymentStatus" => "success"
            ]);

        if ($song->getExplorable()) $pass = true;
        else if ($payment) $pass = true;
        else $pass = false;
                
        if (!$pass) {
            $response = $this->json(["error"=>"access denied"]);
            $response->setStatusCode(Response::HTTP_FORBIDDEN);
            return $response;
        }

        if (!$mediaObject = $song->getFile()) throw new Error('Song has no file');
        $response = $downloadHandler->downloadObject($mediaObject, $fileField = 'file');
        return $response;
    }

    /**
     * @Route(
     *     name="song_insert_history",
     *     path="/api/play/{id}",
     *     methods={"POST"}
     * )
     */
    public function playHistory(Request $request, Song $song): Response
    {
        $user = $this->getUser();

        $entityManager = $this->getDoctrine()->getManager();

        $play = new PlayHistory();
        $play->setUser($user);
        $play->setSong($song);

        $entityManager->persist($play);
        $entityManager->flush();

        return new Response('Saved new play with id '.$play->getId());
    }
}
