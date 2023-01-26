<?php

namespace App\Http\Controllers\api\admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\user\UserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use App\Services\user\UserService;

class UserController extends Controller
{
    private $user_service;
    
    public function __construct(UserService $user_service)
    {
        $this->user_service = $user_service;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = $this->user_service->getAllUsers();
        return response()->json(['users' => $users], 200);
    }

    public function store()
    {
        $users = $this->user_service->getAllUsers();
        return response()->json(['users' => $users], 200);
    }

    public function show(User $user)
    {
        return response()->json(['user' => $user], 200);
    }

    public function update(UserRequest $request, User $user)
    {
        $update_data = $this->user_service->updateUser($request->all(), $user);
        return response()->json(['user' => $update_data], 200);
    }

    public function destroy()
    {
        $users = $this->user_service->getAllUsers();
        return response()->json(['users' => $users], 200);
    }

    public function search()
    {
        $users = $this->user_service->getAllUsers();
        return response()->json(['users' => $users], 200);
    }
}
