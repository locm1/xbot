<?php

namespace App\Repositories\user;

use Illuminate\Database\Eloquent\Collection;
use App\Models\User;

class UserRepository implements UserRepositoryInterface 
{
    /**
     * ユーザー一覧を取得
     *
     * @return Collection
     */
    public function getAllUsers(): Collection
    {
        return User::all();
    }
}