<?php
namespace App\MediaParsers;

use App\MediaParsers\BaseParser;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class ImageParser extends BaseParser
{
    function __construct(UploadedFile $file) {
        parent::__construct($file);
    }

    public static function isType(UploadedFile $file): bool
    {
        $mime = $file->getMimeType();
        return str_contains($mime, "image");
    }

    public function generateMetadata(): ?array
    {
        $meta = parent::generateMetadata();
        $meta['type'] = "image";
        list($width, $height, $type, $attr) = getimagesize($this->file->getPathname());
        $meta['dimensions'] = ["width"=>$width, "height"=>$height];
        return $meta;
    }
}