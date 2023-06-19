<?php

namespace App\Services\common;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class CreateThumbnailFileUtility
{
    public static function getThumbnailFiles($video_thumbnails, $ids, $file_name)
    {
        # 画像を削除しストレージに保存
        $files = array();
        foreach (array_map(null, $video_thumbnails, $ids) as [$video_thumbnail, $id]) {
            $uuid = (string)Str::uuid();
            $base64_data = substr($video_thumbnail, strpos($video_thumbnail, ',') + 1);
            $decode_video_thumbnails = base64_decode($base64_data);
            $storage_path = 'video_thumbnail/' .$uuid .'_' .$file_name .'.png';
            Storage::disk('public')->put($storage_path, $decode_video_thumbnails);

            $files[] = [
                'id' => $id,
                'file_name' => '/storage/video_thumbnail/' .$uuid .'_' .$file_name .'.png'
            ];
        }
        return $files;
    }
}
