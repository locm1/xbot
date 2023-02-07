<?php

namespace App\Services\management\user;

use App\Models\User;

class UserDemographicService
{

    public function getUserDemographic() 
    {
        $users = User::orderBy('id', 'asc')->get()
            ->groupBy(function ($row) {
                return $row->gender;
            })
            ->map(function ($gender) {
                return $gender->count();
            });
        return $users;
    }
}
