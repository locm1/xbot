<?php

namespace App\Services\management\greeting;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class UpsertGreetingMessageAction
{
    public function updateFiles($request, $method)
    {
        $merged_greeting_messages = array();
        $messages = $request->messages;

        # 更新する画像ファイルがある場合
        $files = isset($request->image_ids) ? $this->getFiles($request, 'images', $request->image_ids, 'greeting') : null;
        $videos = isset($request->video_ids) ? $this->getFiles($request, 'videos', $request->video_ids, 'video') : null;

        # 動画が送られてきたら、サムネイルの保存
        $video_thumbnails = isset($request->video_thumbnails) ? $this->getThumbnailFiles($request->video_thumbnails, $request->video_ids) : null;

        foreach ($messages as $message) {
            if (isset($message['current_image_path'])) {
                $this->deleteFile('greeting', $message['current_image_path']);
            }

            if (isset($message['current_video_path'])) {
                $this->deleteFile('video', $message['current_video_path']);
            }

            $image_file_name = isset($files)
                ? array_reduce(array_filter($files, function($file) use($message) { return $file['id'] == $message['id'];}), 'array_merge', array())
                : $message['image_path'];

            $video_file_name = isset($videos)
                ? array_reduce(array_filter($videos, function($video) use($message) { return $video['id'] == $message['id'];}), 'array_merge', array())
                : $message['video_path'];

            $video_thumbnail_file_name = isset($video_thumbnails)
                ? array_reduce(array_filter($video_thumbnails, function($video_thumbnail) use($message) { return $video_thumbnail['id'] == $message['id'];}), 'array_merge', array())
                : $message['thumbnail_path'];
            
            $id = ($method == 'update') ? $message['id'] : null;
            
            $merged_greeting_messages[] = [
                'id' => $id,
                'type' => $message['type'],
                'text' => $message['text'],
                'image_path' => isset($image_file_name['file_name']) ? $image_file_name['file_name'] : $message['image_path'],
                'video_path' => isset($video_file_name['file_name']) ? $video_file_name['file_name'] : $message['video_path'],
                'thumbnail_path' => isset($video_thumbnail_file_name['file_name']) ? $video_thumbnail_file_name['file_name'] : $message['thumbnail_path'],
            ];
        }
        return $merged_greeting_messages;
    }

    private function getFiles($request, $file_path, $ids, $path)
    {
        # 画像を削除しストレージに保存
        $files = array();
        foreach (array_map(null, $request->file($file_path), $ids) as [$file, $id]) {
            $file_name = $file->getClientOriginalName();
            $file->storeAs("public/$path", $file_name);

            $files[] = [
                'id' => $id,
                'file_name' => "/storage/$path/$file_name"
            ];
        }
        return $files;
    }

    private function getThumbnailFiles($video_thumbnails, $ids)
    {
        # 画像を削除しストレージに保存
        $files = array();
        foreach (array_map(null, $video_thumbnails, $ids) as [$video_thumbnail, $id]) {
            $base64_data = substr($video_thumbnail, strpos($video_thumbnail, ',') + 1);
            $decode_video_thumbnails = base64_decode($base64_data);
            $storage_path = "video_thumbnail/greeting_video_thumbnail_$id.png";
            Storage::disk('public')->put($storage_path, $decode_video_thumbnails);

            $files[] = [
                'id' => $id,
                'file_name' => "/storage/video_thumbnail/greeting_video_thumbnail_$id.png"
            ];
        }
        return $files;
    }

    public function deleteFile($path, $current_path)
    {
        $delete_file_path = str_replace("/storage/$path", $path, $current_path);
        return Storage::disk('public')->delete($delete_file_path);
    }
}
