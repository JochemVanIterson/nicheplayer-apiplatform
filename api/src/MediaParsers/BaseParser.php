<?php
namespace App\MediaParsers;

use Symfony\Component\HttpFoundation\File\UploadedFile;

class BaseParser
{
    protected UploadedFile $file;

    function __construct(UploadedFile $file)
    {
        $this->file = $file;
    }

    public static function isType(UploadedFile $file): bool
    {
        return false;
    }

    public function generateMetadata(): ?array
    {
        $meta = array();
        $meta['mime'] = $this->file->getMimeType();
        $meta['size'] = filesize($this->file->getPathname());
        return $meta;
    }
}