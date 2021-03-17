<?php
namespace App\MediaParsers;

use App\MediaParsers\BaseParser;
use Symfony\Component\HttpFoundation\File\UploadedFile;

require __DIR__.'/../../vendor/james-heinrich/getid3/getid3/getid3.php';

class AudioParser extends BaseParser
{
    private $getID3 = null;
    function __construct(UploadedFile $file) {
        parent::__construct($file);
        $this->getID3 = new \getID3;
    }

    public static function isType(UploadedFile $file): bool
    {
        $mime = $file->getMimeType();
        return str_contains($mime, "audio");
    }

    public function generateMetadata(): ?array
    {
        $meta = parent::generateMetadata();

        $id3Data = $this->getID3->analyze($this->file->getPathname());
        $this->getID3->CopyTagsToComments($id3Data);

        $meta['artist'] = $id3Data['comments_html']['artist'][0];
        $meta['title']  = $id3Data['tags']['id3v2']['title'][0];
        $meta['album']  = $id3Data['tags']['id3v2']['album'][0];

        return $meta;
    }
}