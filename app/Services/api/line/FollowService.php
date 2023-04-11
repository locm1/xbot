<?php
namespace App\Services\api\line;

use App\Models\InflowRouteUser;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use LINE\LINEBot;

use function PHPUnit\Framework\throwException;

class FollowService 
{
    protected $line_id;
    protected $bot;

    public function __construct(LINEBot $bot, string $line_id) {
        $this->line_id = $line_id;
        $this->bot = $bot;
    }

    public function createUser()
    {
        $response = $this->bot->getProfile($this->line_id);
        if ($response->isSucceeded()) {
            $profile = $response->getJSONDecodedBody();
            $display_name = $profile['displayName'];
            $picture_url = $profile['pictureUrl'] ?? null;
            $status_message = $profile['statusMessage'] ?? null;
            User::upsert([
                'nickname' => $display_name, 'img_path' => $picture_url, 'line_id' => $this->line_id, 
                'is_blocked' => 0, 'status_message' => $status_message, 'is_registered' => 0
            ], ['line_id']);
            $User = User::where('line_id', $this->line_id)->first();
            return $User;
        } else {
            Log::debug('Failed to get profile. HTTP status code: ' . $response->getHTTPStatus() . ', response body: ' . $response->getRawBody());
            return $response->getHTTPStatus();
        }
    }

    public function checkInflowRoute(User $User)
    {
        $five_minute_before = date("Y-m-d H:i:s",strtotime("-5 minute"));
        $now = date('Y-m-d H:i:s');
        $term = [$five_minute_before, $now];
        $InflowRouteUser = InflowRouteUser::where('line_id', $this->line_id)->whereBetween('created_at', $term)->first();
        $update_count = 0;
        if ($InflowRouteUser) $update_count = $InflowRouteUser->update(['user_id' => $User->id]);

        return $update_count;
    }
}