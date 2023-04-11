<?php
namespace App\Services\liff\invite;

use App\Models\InviteeUser;
use App\Services\api\line\verify\VerifyService;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;

class InviteeUserService 
{
    private $passphrase;
    private $verify_service;

    public function __construct(VerifyService $verify_service) {
        $this->passphrase = config('passphrase.ENCRYPT_PASSPHRASE');
        $this->verify_service = $verify_service;
    }

    public function index($request): Collection
    {
        $line_id = $this->verify_service->verifyIdToken($request->token)['sub'];
        return InviteeUser::where('line_id', $line_id)->get();
    }

    public function store($request)
    {
        $line_id = $this->verify_service->verifyIdToken($request->token)['sub'];
        $inviter_user_id = $this->decryptData($request->inviter_user_id);
        $version_key = $this->decryptData($request->version_key);
        $invited_at = $this->decryptData($request->invited_at);
        $data = [
            'line_id' => $line_id, 'inviter_user_id' => $inviter_user_id,
            'version_key' => $version_key, 'invited_at' => $invited_at
        ];
        return InviteeUser::create($data);
    }

    private function decryptData(string $encrypted_data): string
    {
        $data = base64_decode(str_pad(strtr($encrypted_data, '-_', '+/'), strlen($encrypted_data) % 4, '=', STR_PAD_RIGHT));
        list($encrypted, $iv) = explode('::', $data, 2);
        $iv = str_pad($iv, 16, "\0");
        return openssl_decrypt($encrypted, 'aes-128-cbc', $this->passphrase, OPENSSL_RAW_DATA, $iv);
    }
}