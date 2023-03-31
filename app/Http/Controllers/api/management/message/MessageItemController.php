<?php

namespace App\Http\Controllers\api\management\message;

use App\Http\Controllers\Controller;
use App\Models\Message;
use App\Services\management\message\MessageItemService;
use Illuminate\Http\Request;
use App\Http\Requests\management\message\StoreMessageItemRequest;

class MessageItemController extends Controller
{
    private $message_item_service;

    public function __construct(MessageItemService $message_item_service)
    {
        $this->message_item_service = $message_item_service;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($message_id)
    {
        $message_items = $this->message_item_service->getMessageItemsById($message_id);
        return response()->json(['message_items' => $message_items], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Message $message)
    {
        $message_item = $this->message_item_service->update($request, $message, 'store');
        return response()->json(['message_item' => $message_item], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  Message  $message
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Message $message)
    {
        $message_item = $this->message_item_service->update($request, $message, 'update');
        return response()->json(['message_item' => $message_item], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  Request $request
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $this->message_item_service->destroy($request);
        return response()->json([], 204);
    }
}
