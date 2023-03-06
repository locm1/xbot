<?php
namespace App\Services\api\line;

use App\Models\User;
use Illuminate\Support\Facades\Log;
use LINE\LINEBot;

class UnfollowService 
{
    protected $user_id;
    protected $bot;

    public function __construct(LINEBot $bot, string $user_id) {
        $this->user_id = $user_id;
        $this->bot = $bot;
    }

    public function updateUser(?int $block_timestamp): int
    {
        
        $block_date = $block_timestamp ? date("Y-m-d H:i:s", $block_timestamp / 1000) : null;
        User::where('line_id', $this->user_id)->update([
            'line_id' => $this->user_id, 'is_blocked' => 1, 'block_date' => $block_date,
        ]);
        return 202;
    
    }
}