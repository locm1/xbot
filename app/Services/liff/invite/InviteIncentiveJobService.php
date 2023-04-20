<?php
namespace App\Services\liff\invite;

use App\Models\InviteIncentiveJob;
use App\Models\User;
use App\Services\api\line\verify\VerifyService;
use Illuminate\Database\Eloquent\Collection;

class InviteIncentiveJobService
{
    public function index($request): Collection
    {
        $verify_service = new VerifyService;
        $invite_incentive_id = $this->decryptData($request->invite_incentive_id);
        $line_id = $verify_service->verifyIdToken($request->token)['sub'];
        return InviteIncentiveJob::where('line_id', $line_id)->get();
    }

    public function store($request)
    {
        $verify_service = new VerifyService;
        $invite_incentive_id = $this->decryptData($request->invite_incentive_id);
        $line_id = $verify_service->verifyIdToken($request->token)['sub'];
        $inviter_user_id = $this->decryptData($request->inviter_user_id);
        $data = [
            'invitee_line_id' => $line_id, 'inviter_user_id' => $inviter_user_id,
            'invite_incentive_id' => $invite_incentive_id
        ];
        return InviteIncentiveJob::create($data);
    }

    public function findByLineId(string $line_id): ?InviteIncentiveJob
    {
        $five_minute_before = date("Y-m-d H:i:s",strtotime("-5 minute"));
        $now = date('Y-m-d H:i:s');
        $term = [$five_minute_before, $now];
        $InviteIncentiveJob = InviteIncentiveJob::with('inviteIncentive')->where('invitee_line_id', $line_id)->whereBetween('created_at', $term)->first();
        return $InviteIncentiveJob;
    }

    public function findByUserId(int $user_id): ?InviteIncentiveJob
    {
        $five_minute_before = date("Y-m-d H:i:s",strtotime("-5 minute"));
        $now = date('Y-m-d H:i:s');
        $term = [$five_minute_before, $now];
        $InviteIncentiveJob = InviteIncentiveJob::with('inviteIncentive')->where('invitee_user_id', $user_id)->whereBetween('created_at', $term)->first();

        return $InviteIncentiveJob;
    }

    private function decryptData(string $encrypted)
    {
        $replaced = str_replace(array('_','-', '.'), array('=', '/', '+'), $encrypted);
        $decrypted = openssl_decrypt($replaced, 'AES-128-ECB', config('passphrase'));
        return $decrypted;
    }
}
