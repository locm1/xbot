<?php

namespace App\Services\management\user;

use Illuminate\Database\Eloquent\Collection;
use App\Services\management\AbstractManagementService;
use App\Services\management\user\SearchUserAction;
use App\Models\User;
use GuzzleHttp\Psr7\Request;
use Illuminate\Database\Eloquent\Model;

class UserService
{
    private $search_user_action;

    public function __construct(SearchUserAction $search_user_action)
    {
        $this->search_user_action = $search_user_action;
    }

    public function index($request): Collection
    {
        if (isset($request)) {
            return $this->search_user_action->search($request);
        }

        return User::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     */
    public function store($request): User
    {
        $attributes = $request->only(['login_id', 'name', 'role', 'password']);
        // $format_admin_action = new FormatAdminAction($attributes);
        // $formated_data = $format_admin_action->mergePasswordToArray();
        return User::create($attributes);
    }

    /**
     * Display the specified resource.
     *
     * @param  User $user
     * @return User
     */
    public function show(Model $user): User
    {
        return $user;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  Model $user
     * @return array
     */
    public function update($request, Model $user): array
    {
        $data = $request->all();
        $user->update($data);
        return $data;
    }

    /**
     * Delete the specified resource.
     *
     * @param  Admin $admin
     */
    public function destroy(Model $admin)
    {
        return $admin->delete();
    }
}