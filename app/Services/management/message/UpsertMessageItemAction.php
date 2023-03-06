<?php

namespace App\Services\management\message;
use Illuminate\Support\Facades\Storage;

class UpsertMessageItemAction
{
    public function updateFiles($request, $message)
    {
        $merged_message_items = array();
        $message_items = json_decode($request->message_items);

        # 更新する画像ファイルがある場合
        $files = isset($request->image_ids) ? $this->getFiles($request, 'images', $request->image_ids, 'message') : null;
        $videos = isset($request->video_ids) ? $this->getFiles($request, 'videos', $request->video_ids, 'video') : null;

        foreach ($message_items as $message_item) {
            if (isset($message_item->current_image_path)) {
                $this->deleteFile('message', $message_item->current_image_path);
            }

            if (isset($message_item->current_video_path)) {
                $this->deleteFile('video', $message_item->current_video_path);
            }

            $image_file_name = isset($files)
                ? array_reduce(array_filter($files, function($file) use($message_item) { return $file['id'] == $message_item->id;}), 'array_merge', array())
                : $message_item->image_path;

            $video_file_name = isset($videos)
                ? array_reduce(array_filter($videos, function($video) use($message_item) { return $video['id'] == $message_item->id;}), 'array_merge', array())
                : $message_item->video_path;
                
            
            $merged_message_items[] = [
                'id' => $message_item->id,
                'message_id' => $message->id,
                'type' => $message_item->type,
                'text' => $message_item->text,
                'image_path' => isset($image_file_name['file_name']) ? $image_file_name['file_name'] : $message_item->image_path,
                'video_path' => isset($video_file_name['file_name']) ? $video_file_name['file_name'] : $message_item->video_path,
            ];
        }
        return $merged_message_items;
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
