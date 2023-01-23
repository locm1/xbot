<?php

namespace App\Http\Controllers\api\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\user\UserService;

class UserController extends Controller
{
    private $user_service;
    
    public function __construct(UserService $user_service)
    {
        $this->user_service = $user_service;
    }

    public function index()
    {
        $users = $this->user_service->getAllUsers();
        return response()->json([
            'users' => $users,
            'code' => 200
        ]);
    }
}