<?php
namespace App\Services\api\line;

use App\Models\User;
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
        $response = $this->bot->getProfile($this->user_id);
        if ($response->isSucceeded()) {
            $profile = $response->getJSONDecodedBody();
            $display_name = $profile['displayName'];
            $picture_url = $profile['pictureUrl'] ?? null;
            $status_message = $profile['statusMessage'] ?? null;
            User::upsert([
                'nickname' => $display_name, 'img_path' => $picture_url, 'line_id' => $this->user_id, 
                'is_blocked' => 0, 'status_message' => $status_message, 'is_registered' => 0
            ], ['line_id']);
            Log::debug($this->user_id);
            return $response->getHTTPStatus();
        } else {
            Log::debug('Failed to get profile. HTTP status code: ' . $response->getHTTPStatus() . ', response body: ' . $response->getRawBody());
            return $response->getHTTPStatus();
        }
    }
}