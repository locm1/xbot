<?php
namespace App\Services\api\line;

use Illuminate\Support\Facades\Log;
use LINE\LINEBot;

class FollowService 
{
    protected $user_id;
    protected $bot;

    public function __construct(LINEBot $bot, string $user_id) {
        $this->user_id = $user_id;
        $this->bot = $bot;
    }

    public function createUser()
    {
        $response = $this->bot->getProfile('<USER_ID>');
        if ($response->isSucceeded()) {
            $profile = $response->getJSONDecodedBody();
            $display_name = $profile['displayName'];
            $picture_url = $profile['pictureUrl'];
            $status_message = $profile['statusMessage'];
            Log::debug($display_name . $picture_url . $status_message);
        } else {
            error_log('Failed to get profile. HTTP status code: ' . $response->getHTTPStatus() . ', response body: ' . $response->getRawBody());
            Log::debug($response);
        }
    }
}