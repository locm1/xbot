<?php
namespace App\Services\liff\invite;

use App\Models\InviteIncentiveJob;
use App\Models\User;

class InviteIncentiveJobService
{
    public function searchByLineId(string $line_id): InviteIncentiveJob
    {
        $line_id = "U8e464a551171be43ead486ec63cc6ef3";
        $five_minute_before = date("Y-m-d H:i:s",strtotime("-5 minute"));
        $now = date('Y-m-d H:i:s');
        $term = [$five_minute_before, $now];
        $InviteIncentiveJob = InviteIncentiveJob::with('inviteIncentive')->where('invitee_line_id', $line_id)->whereBetween('created_at', $term)->first();

        return $InviteIncentiveJob;
    }
}
