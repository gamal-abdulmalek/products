<?php

namespace App\Utils;

use Illuminate\Support\Facades\Storage;
use Illuminate\Http\UploadedFile;

class ProductUtil
{
    /**
     * Upload an image to the specified disk and directory.
     *
     * @param UploadedFile $image
     * @param string $directory
     * @param string|null $disk
     * @return string|null
     */
    public static function upload(UploadedFile $image, string $directory, string $disk = 'public'): ?string
    {
        try {
            $imageName = uniqid() . '.' . $image->getClientOriginalExtension();

            $path = $image->storeAs($directory, $imageName, $disk);

            return $path;
        } catch (\Exception $e) {
            return null;
        }
    }

}