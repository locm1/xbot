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
    public function getUser($request): ?User
    {
        $response = $this->verify_service->verifyIdToken($request->token);
        return User::where('line_id', $response['sub'])->first();
    }

    public function update($request, User $user)
    {
        $data = $request->only([
            'first_name', 'last_name', 'first_name_kana', 'last_name_kana', 'zipcode',
            'prefecture', 'city', 'address', 'building_name', 'tel',
            'birth_date', 'gender', 'occupation_id'
        ]);
        $merged_data = array_merge(
            $data, 
            ['is_registered' => 1], 
            ['building_name' => $request->building_name . ' ' .$request->room_number]
        );
        return $user->update($merged_data);
    }
}