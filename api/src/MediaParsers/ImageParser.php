<?php
namespace App\MediaParsers;

use App\MediaParsers\BaseParser;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\File\File;

class ImageParser extends BaseParser
{
    function __construct(UploadedFile|File $file) {
        parent::__construct($file);
    }

    public static function isType(UploadedFile|File $file): bool
    {
        $mime = $file->getMimeType();
        return str_contains($mime, "image");
    }

    public function generateMetadata(): ?array
    {
        $imageFile = $this->file->getPathname();
        $meta = parent::generateMetadata();
        list($width, $height, $type, $attr) = getimagesize($imageFile);
        $meta['dimensions'] = ["width"=>$width, "height"=>$height];
        $meta['colors'] = $this->colorPalette($imageFile, 5, 5);
        return $meta;
    }

    private function colorPalette($imageFile, $numColors, $granularity = 5) {
        $granularity = max(1, abs((int)$granularity));
        $colors = array();
        $size = getimagesize($imageFile);
        if($size === false) {
            user_error("Unable to get image size data");
            return false;
        }
        $img = @imagecreatefromstring(file_get_contents($imageFile));

        if(!$img) {
            user_error("Unable to open image file");
            return false;
        }
        for($x = 0; $x < $size[0]; $x += $granularity) {
            for($y = 0; $y < $size[1]; $y += $granularity) {
                $thisColor = imagecolorat($img, $x, $y);
                $rgb = imagecolorsforindex($img, $thisColor);
                $red = round(round(($rgb['red'] / 0x11)) * 0x11);
                $green = round(round(($rgb['green'] / 0x11)) * 0x11);
                $blue = round(round(($rgb['blue'] / 0x11)) * 0x11);
                $thisRGB = sprintf('%02X%02X%02X', $red, $green, $blue);
                if (fmod(base_convert($thisRGB, 16, 10) / 0x111111, 1) == 0) continue;
                if(array_key_exists($thisRGB, $colors)) {
                    $colors[$thisRGB]++;
                }
                else {
                    $colors[$thisRGB] = 1;
                }
            }
        }
        arsort($colors);
        return array_slice(array_keys($colors), 0, $numColors);
    }
}