<?php

namespace App\Http\Controllers\api\management\message;

use App\Http\Controllers\Controller;
use App\Models\Message;
use App\Services\management\message\MessageService;
use Illuminate\Http\Request;

class MessageController extends Controller
{

    private $message_service;

    public function __construct(MessageService $message_service)
    {
        $this->message_service = $message_service;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $messages = $this->message_service->index();
        return response()->json(['messages' => $messages], 200);
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
     * @param  Message $message
     * @return \Illuminate\Http\Response
     */
    public function show(Message $message)
    {
        $message = $this->message_service->show($message);
        return response()->json(['message' => $message], 200);
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
