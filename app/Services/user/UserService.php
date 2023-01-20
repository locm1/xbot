<?php

namespace App\Services\user;

use Illuminate\Database\Eloquent\Collection;
use App\Models\User;

class UserService
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