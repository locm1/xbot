<?php

namespace App\Services\api;

use GuzzleHttp\Client;

class ChatworkMessageService
{
    private $client;

    public function __construct() {
        $this->client = new Client();
    }

    public function postedMessage($message)
    {
        $room_id = config('chatwork_api.CHATWORK_ROOM_ID');
        $api_token = config('chatwork_api.CHATWORK_API_TOKEN');
        $api_url = "https://api.chatwork.com/v2/rooms/$room_id/messages";

        $option = [
            'headers' => [
                'x-chatworktoken' => $api_token
            ],
            'form_params' => [
                'body' => $message,
                'self_unread' => 1
            ]
        ];
        $response = $this->client->request('POST', $api_url, $option);
        return json_decode($response->getBody(), true);
    }
}
