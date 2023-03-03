<?php

namespace App\Http\Controllers\api\management\message;

use App\Http\Controllers\Controller;
use App\Models\Message;
use App\Services\management\message\MessageItemService;
use Illuminate\Http\Request;

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
    public function getMessageItemsById(Message $message)
    {
        $message_items = $this->message_item_service->getMessageItemsById($message);
        return response()->json(['message_items' => $message_items], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
