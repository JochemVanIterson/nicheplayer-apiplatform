<?php
namespace App\MediaParsers;

use App\MediaParsers\BaseParser;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\File\File;

require __DIR__.'/../../vendor/james-heinrich/getid3/getid3/getid3.php';

class AudioParser extends BaseParser
{
    private $getID3 = null;
    function __construct(UploadedFile|File $file) {
        parent::__construct($file);
        $this->getID3 = new \getID3;
    }

    public static function isType(UploadedFile|File $file): bool
    {
        $mime = $file->getMimeType();
        return str_contains($mime, "audio");
    }

    public function generateMetadata(): ?array
    {
        $meta = parent::generateMetadata();

        $id3Data = $this->getID3->analyze($this->file->getPathname());
        $this->getID3->CopyTagsToComments($id3Data);

        $meta['duration'] = (isset($id3Data['playtime_seconds'])) ? $id3Data['playtime_seconds'] : 0;
        
        if (isset($id3Data['tags']['id3v2'])) {
            $tag = $id3Data['tags']['id3v2'];
            if (isset($tag['artist'])) $meta['artist'] = $tag['artist'][0];
            if (isset($tag['title']))  $meta['title']  = $tag['title'][0];
            if (isset($tag['album']))  $meta['album']  = $tag['album'][0];
            if (isset($tag['track_number']))  $meta['track']  = $tag['track_number'][0];
            if (isset($tag['totaltracks']))  $meta['totaltracks']  = $tag['totaltracks'][0];
            if (isset($tag['year']))  $meta['year']  = $tag['year'][0];
        }

        return $meta;
    }
}