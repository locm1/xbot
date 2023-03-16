<?php

namespace App\Services\api;

use GuzzleHttp\Client;

class SearchZipcodeService
{
    private $client;

    public function __construct() 
    {
        $this->client = new Client();
    }

    #  郵便番号APIから住所を取得
    public function getAddress($zip_code) 
    {
        $api_url = "https://zipcloud.ibsnet.co.jp/api/search?zipcode=$zip_code";
        $response = $this->client->request('GET', $api_url);
        return json_decode($response->getBody(), true);
    }
}