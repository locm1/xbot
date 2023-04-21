<?php

namespace App\Services\management\user;

use Illuminate\Database\Eloquent\Collection;
use App\Services\management\AbstractManagementService;
use App\Services\management\user\SearchUserAction;
use App\Models\User;
use App\Models\UserInfoStatus;
use GuzzleHttp\Psr7\Request;
use Illuminate\Database\Eloquent\Model;

class UserInfoStatusService
{
    public function index(): Collection
    {
        return UserInfoStatus::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     */
    public function update($request)
    {
        return UserInfoStatus::upsert($request->user_info_statuses, ['id'], ['is_undisclosed', 'is_required']);
    }
}