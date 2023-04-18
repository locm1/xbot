<?php
namespace App\Services\liff\invite;

use App\Models\InviteeUser;
use App\Models\InviteIncentiveJob;
use App\Services\api\line\verify\VerifyService;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;

class InviteeUserService 
{
    private $verify_service;

    public function __construct(VerifyService $verify_service) {
        $this->verify_service = $verify_service;
    }

    public function index($request): Collection
    {
        $line_id = $this->verify_service->verifyIdToken($request->token)['sub'];
        return InviteIncentiveJob::where('line_id', $line_id)->get();
    }

    public function store($request)
    {
        $invite_incentive_id = $this->decryptData($request->invite_incentive_id);
        $line_id = $this->verify_service->verifyIdToken($request->token)['sub'];
        $inviter_user_id = $this->decryptData($request->inviter_user_id);
        $data = [
            'invitee_line_id' => $line_id, 'inviter_user_id' => $inviter_user_id,
            'invite_incentive_id' => $invite_incentive_id
        ];
        return InviteIncentiveJob::create($data);
    }

    private function decryptData(string $encrypted): string
    {
        $decrypted = openssl_decrypt($encrypted, 'AES-128-ECB', config('passphrase'));
        $replaced = str_replace(array('_','-', '.'), array('=', '/', '+'), $decrypted);
        return $replaced;
    }
}