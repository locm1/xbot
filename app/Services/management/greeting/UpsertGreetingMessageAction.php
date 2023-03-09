<?php

namespace App\Services\management\greeting;
use Illuminate\Support\Facades\Storage;

class UpsertGreetingMessageAction
{
    public function updateFiles($request, $method)
    {
        $merged_greeting_messages = array();
        $messages = json_decode($request->messages);

        # 更新する画像ファイルがある場合
        $files = isset($request->image_ids) ? $this->getFiles($request, 'images', $request->image_ids, 'greeting') : null;
        $videos = isset($request->video_ids) ? $this->getFiles($request, 'videos', $request->video_ids, 'video') : null;

        foreach ($messages as $message) {
            if (isset($message->current_image_path)) {
                $this->deleteFile('greeting', $message->current_image_path);
            }

            if (isset($message->current_video_path)) {
                $this->deleteFile('video', $message->current_video_path);
            }

            $image_file_name = isset($files)
                ? array_reduce(array_filter($files, function($file) use($message) { return $file['id'] == $message->id;}), 'array_merge', array())
                : $message->image_path;

            $video_file_name = isset($videos)
                ? array_reduce(array_filter($videos, function($video) use($message) { return $video['id'] == $message->id;}), 'array_merge', array())
                : $message->video_path;
            
            $id = ($method == 'update') ? $message->id : null;
            
            $merged_greeting_messages[] = [
                'id' => $id,
                'type' => $message->type,
                'text' => $message->text,
                'image_path' => isset($image_file_name['file_name']) ? $image_file_name['file_name'] : $message->image_path,
                'video_path' => isset($video_file_name['file_name']) ? $video_file_name['file_name'] : $message->video_path,
            ];
        }
        return $merged_greeting_messages;
    }

    private  function getFiles($request, $file_path, $ids, $path)
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

    public function deleteFile($path, $current_path)
    {
        $delete_file_path = str_replace("/storage/$path", $path, $current_path);
        return Storage::disk('public')->delete($delete_file_path);
    }
}
