<?php

namespace App\Services\management\admin;

use App\Models\Admin;
use Illuminate\Database\Eloquent\Collection;
use App\Services\management\AbstractManagementService;
use Illuminate\Database\Eloquent\Model;

class AdminService extends AbstractManagementService
{
    /**
     * Display a listing of the resource.
     *
     * @return Collection
     */
    public function index(): Collection
    {
        return Admin::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     */
    public function store($request): Admin
    {
        $attributes = $request->only(['login_id', 'name', 'role', 'password']);
        $format_admin_action = new FormatAdminAction($attributes);
        $formated_data = $format_admin_action->mergePasswordToArray();
        return Admin::create($formated_data);
    }

    /**
     * Display the specified resource.
     *
     * @param  Admin $admin
     * @return Admin
     */
    public function show(Model $admin): Admin
    {
        return $admin;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  Model $admin
     * @return array
     */
    public function update($request, Model $admin): array
    {
        $format_admin_action = new FormatAdminAction($request->data);
        $formated_data = $format_admin_action->getUpdateData($request->is_checked);
        $admin->update($formated_data);
        return $formated_data;
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
