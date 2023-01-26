<?php

namespace App\Services\user;

use Illuminate\Database\Eloquent\Collection;
use App\Models\User;

class UserService
{
    public function getAllUsers(): Collection
    {
        return User::all();
    }

    public function updateUser(array $data, User $user): array
    {
        $user->update($data);
        return $data;
    }
}