<?php

namespace App\Http\Controllers\api\liff\user;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\liff\user\UserService;
use Illuminate\Http\Request;
use App\Http\Requests\liff\user\UpdateUserRequest;

class UserController extends Controller
{
    private $service;

    public function __construct(UserService $service)
    {
        $this->service = $service;
    }

    /**
     * Display the specified resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $User = $this->service->getUser($request);
        if (!$User) return abort(500);
        return response()->json(['user' => $User], 200);
    }

    public function update(UpdateUserRequest $request, User $user)
    {
        $user = $this->service->update($request, $user);
        return response()->json(['user' => $user], 200);
    }
}
