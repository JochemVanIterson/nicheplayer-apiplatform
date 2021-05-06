<?php

namespace App\Controller;

use App\Entity\Nfc;
use App\Entity\Album;
use App\Repository\NfcRepository;
use App\Repository\AlbumRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api")
 */
class NFCController extends AbstractController
{
    /**
     * @Route(
     *     name="api_nfc_post",
     *     path="/nfcs",
     *     methods={"POST"}
     * )
     */
    public function createNfc(Request $request, AlbumRepository $albumRepository) {
        $em = $this->getDoctrine()->getManager();
        
        $payload = $request->getContent();
        $json = json_decode($payload, true);
        $album = $albumRepository->findOneBy(['id' => str_replace('/api/albums/', '', $json['album'])]);

        if ($json['range']) {
            $rangeMin = hexdec($json['rangeMin']);
            $rangeMax = hexdec($json['rangeMax']);
            for ($i=$rangeMin; $i <= $rangeMax; $i++) {
                $cardUID = str_pad(strtoupper(dechex($i)), 14, "0", STR_PAD_LEFT);
                $nfc = new Nfc();
                $nfc->setAlbum($album);
                $nfc->setCardUID($cardUID);
                $em->persist($nfc);
            }
        } else {
            $nfc = new Nfc();
            $nfc->setAlbum($album);
            $nfc->setCardUID(str_pad(strtoupper($json['cardUID']), 14, "0", STR_PAD_LEFT));
            $em->persist($nfc);
        }
        $em->flush();
        return $this->json(array("status"=>"success"));
    }

    /**
     * @Route(
     *     name="api_scan_post",
     *     path="/nfc_scan",
     *     methods={"POST"}
     * )
     */
    public function scanNfc(Request $request, NfcRepository $nfcRepository, AlbumRepository $albumRepository) {
        dump($request);
        $em = $this->getDoctrine()->getManager();
        
        $user = $this->getUser();

        $payload = $request->getContent();
        $json = json_decode($payload, true);
        dump($json);
        $album = $albumRepository->findOneBy(['id' => str_replace('/api/albums/', '', $json['album'])]);

        $nfcCard = $nfcRepository->findOneBy(['cardUID'=>$json['uid']]);
        $nfcCard->addUser($user);
        dump($nfcCard);
        // $play = new PlayHistory();
        // $play->setUser($user);
        // $play->setSong($song);

        // $em->persist($play);

        $em->flush();
        return $this->json($nfcCard);
    }
}
