<?php
namespace App\Services\liff\invite;

use App\Models\InviteeIncentiveUser;
use App\Models\InviteeUser;
use App\Models\InviterIncentiveUser;
use App\Models\User;
use App\Services\api\line\verify\VerifyService;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;

class InviterIncentiveUserService 
{
    public function index(User $user)
    {
        return InviterIncentiveUser::where('user_id', $user->id)
            ->where('usage_status', 1)
            ->with('inviteIncentive')->get();
    }

    public function update($request, $inviter_incentive)
    {
        $data = $request->only('usage_status');
        $merged_data = array_merge($data, ['usage_date' => date('Y-m-d H:i:s')]);
        return $inviter_incentive->update($merged_data);
    }
}