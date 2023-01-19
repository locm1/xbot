<?php

namespace App\Services\user;

use App\Repositories\user\UserRepository;
use Illuminate\Database\Eloquent\Collection;

class UserService
{
    protected $user_repository;

    public function __construct(UserRepository $user_repository)
    {
        $this->user_repository = $user_repository;
    }

    public function getAllUsers()
    {
        $users = $this->user_repository->getAllUsers();
        return $users;
    }
}