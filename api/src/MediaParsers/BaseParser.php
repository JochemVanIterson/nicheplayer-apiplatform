<?php
namespace App\MediaParsers;

use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\File\File;

class BaseParser
{
    protected UploadedFile|File $file;

    function __construct(UploadedFile|File $file)
    {
        $this->file = $file;
    }

    public static function isType(UploadedFile|File $file): bool
    {
        return false;
    }

    public function generateMetadata(): ?array
    {
        $meta = array();
        return $meta;
    }
}