<?php

namespace App\Services\admin;

use App\Models\Admin;
use Illuminate\Database\Eloquent\Collection;
use App\Services\common\MergeHashedPasswordService;

class AdminService 
{

    public function getAllAdmins(): Collection
    {
        return Admin::all();
    }


    public function createAdmin() 
    {
        //
    }


    public function getAdminById() 
    {
        //
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  array $data
     * @param  Admin $admin
     * @return array
     */
    public function updateAdmin(array $data, Admin $admin): array
    {
        // パスワードハッシュ化して、リクエストの配列にマージする
        $merge_service = new MergeHashedPasswordService($data['password'], $data);
        $data = $data['is_check'] ? $merge_service->mergePasswordToArray() : $data;

        $admin->update($data);
        return $data;
    }

    public function deleteAdmin() 
    {
        //
    }

}
