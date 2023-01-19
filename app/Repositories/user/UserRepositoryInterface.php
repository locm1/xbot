<?php

namespace App\Repositories\user;

use Illuminate\Database\Eloquent\Collection;

interface UserRepositoryInterface 
{
    public function getAllUsers(): Collection;
}