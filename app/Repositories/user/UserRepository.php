<?php

namespace App\Repositories\user;

use Illuminate\Database\Eloquent\Collection;
use App\Models\User;

class UserRepository implements UserRepositoryInterface 
{
    public function getAllUsers(): Collection
    {
        return User::all();
    }
}