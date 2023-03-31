<?php

namespace App\Services\management\message;

use App\Models\Message;
use App\Models\MessageItem;
use App\Services\management\message\UpsertMessageItemAction;
use Illuminate\Support\Facades\Storage;

class MessageItemService
{
    private $upsert_message_item_action;

    public function __construct(UpsertMessageItemAction $upsert_message_item_action,) {
        $this->upsert_message_item_action = $upsert_message_item_action;
    }

    public function getMessageItemsById($message_id) 
    {
        return Message::with(['messageItems.CarouselImages', 'messageItems.CarouselProducts'])->find($message_id)->messageItems;
        // return $message->messageItems->messageItemCarouselImage;
    }

    public function update($request, Message $message, $method) 
    {
        return $this->upsert_message_item_action->updateFiles($request, $message, $method);
        // return MessageItem::upsert($merged_message_items, ['id']);
    }

    public function destroy($request) 
    {
        $message_items = MessageItem::whereIn('id', $request->ids);

        foreach ($message_items->get() as $message_item) {
            if (isset($message_item->image_path)) {
                $this->upsert_message_item_action->deleteFile('message', $message_item->image_path);
            }

            if (isset($message_item->video_path)) {
                $this->upsert_message_item_action->deleteFile('video', $message_item->video_path);
            }
        }
        return $message_items->delete();
    }

}
