<?php
namespace App\Services\api\line\verify;

use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;

class SetDefaultRichMenuService 
{
    private $client;

    public function __construct() {
        $this->client = new Client();
    }

    public function verifyIdToken($token)
    {
        $client_id = config('api_key.LINE_MESSAGE_CHANNEL_TOKEN');
        $api_url = "https://api.line.me/oauth2/v2.1/verify";
        $option = [
            'headers' => ['Content-Type: application/x-www-form-urlencoded'],
            'form_params' => [
                'id_token' => $token,
                'client_id' => $client_id
            ]
        ];
        $response = $this->client->request('POST', $api_url, $option);
        return json_decode($response->getBody(), true);
    }
}