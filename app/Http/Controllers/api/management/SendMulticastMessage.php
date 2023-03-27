<?php

namespace App\Http\Controllers\api\management;

use App\Http\Controllers\Controller;
use App\Models\Message;
use App\Services\api\line\CreateMessageByTypeService;
use App\Services\management\send_multicast_message\SendMulticastMessageService;
use Illuminate\Http\Request;
use LINE\LINEBot as LINEBot;
use LINE\LINEBot\HTTPClient\CurlHTTPClient;
use LINE\LINEBot\MessageBuilder\MultiMessageBuilder;

class SendMulticastMessage extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request) :bool
    {
        $service = new SendMulticastMessageService;
        $send_message_id = $service->insert($request->templateId, $request->userIds, $request->timing);
        if ($request->timing == 1) return $service->reserve($request->sendDate, $send_message_id);
        $response = $service->send($request->templateId, $request->userLineIds);
        return $response->isSucceeded();
    }
}
