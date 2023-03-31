<?php

namespace App\Services\management\message;

use App\Models\MessageItem;
use App\Models\MessageItemCarouselImage;
use App\Models\MessageItemCarouselProduct;
use Illuminate\Support\Facades\Storage;

class UpsertMessageItemAction
{
    public function updateFiles($request, $message, $method)
    {
        $message_items = json_decode($request->message_items);
        // $message_items = $request->message_items;
        // return $message_items;

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
                ? array_reduce(array_filter($files, function($file) use($message_item) { return $file['id'] == $message_item->display_id;}), 'array_merge', array())
                : $message_item->image_path;

            $video_file_name = isset($videos)
                ? array_reduce(array_filter($videos, function($video) use($message_item) { return $video['id'] == $message_item->display_id;}), 'array_merge', array())
                : $message_item->video_path;
            
            $message_item_id = ($method == 'update') ? $message_item->id : null;
            
            $data = [
                'message_id' => $message->id,
                'type' => $message_item->type,
                'text' => $message_item->text,
                'image_path' => isset($image_file_name['file_name']) ? $image_file_name['file_name'] : $message_item->image_path,
                'video_path' => isset($video_file_name['file_name']) ? $video_file_name['file_name'] : $message_item->video_path,
            ];

            # message_item_idがあった場合、update_dataの配列に格納、なければその場でcreateしidを取得
            $message_item_id ? $update_data[] = ($data += ['id' => $message_item_id]) : $message_item_id = MessageItem::create($data)->id;

            # タイプ別にカルーセルをupsert
            if ($request->type == 4) {
                $this->upsertCarouselImages($request->carousel_images, $message_item_id);
            } else if ($request->type == 5) {
                $this->upsertCarouselProducts($request->carousel_products, $message_item_id);
            }
        }
        if ($update_data ?? false) { 
            return MessageItem::upsert($update_data, 'id');
        } 
        return $data;
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
    
    private function upsertCarouselImages($carousel_images, $message_item_id)
    {
        foreach ($carousel_images as $k => $v) {
            $message_item_carousel_image_data[] = [
                'id' => $v['id'],
                'message_item_id' => $message_item_id,
                'image_path' => $v['image_path'],
                'label' => $v['label'],
                'uri' => $v['uri']
            ];
        }
        MessageItemCarouselImage::upsert($message_item_carousel_image_data, 'id');
    }

    private function upsertCarouselProducts($carousel_products, $message_item_id)
    {
        foreach ($carousel_products as $k => $v) {
            $message_item_carousel_product_data[] = [
                'id' => $v['id'],
                'message_item_id' => $message_item_id,
                'image_path' => $v['image_path'],
                'title' => $v['title'],
                'text' => $v['text'],
                'label' => $v['label'],
                'uri' => $v['uri']
            ];
        }
        MessageItemCarouselProduct::upsert($message_item_carousel_product_data, 'id');
    }
}
