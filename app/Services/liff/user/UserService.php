<?php

namespace App\Services\liff\user;

use App\Models\User;
use App\Services\api\line\verify\VerifyService;

class UserService
{
    private $verify_service;

    public function __construct(VerifyService $verify_service)
    {
        $this->verify_service = $verify_service;

    }
    /**
     * Display the specified resource.
     *
     * @param  String $line_id
     * @return User
     */
    public function getUser($request): User
    {
        $response = $this->verify_service->verifyIdToken($request->token);
        return User::where('line_id', $response['sub'])->first();
    }
}