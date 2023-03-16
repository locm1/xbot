<?php

namespace App\Http\Controllers\api\liff\user;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\liff\user\UserService;
use Illuminate\Http\Request;
use App\Http\Requests\liff\user\UpdateUserRequest;

class UserController extends Controller
{
    private $user_service;

    public function __construct(UserService $user_service)
    {
        $this->user_service = $user_service;
    }

    /**
     * Display the specified resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $user = $this->user_service->getUser($request);
        return response()->json(['user' => $user], 200);
    }

    public function update(UpdateUserRequest $request, User $user)
    {
        $user = $this->user_service->update($request, $user);
        return response()->json(['user' => $user], 200);
    }
}
