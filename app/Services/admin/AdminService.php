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
    public function updateAdmin(array $data, Admin $admin, bool $is_checked): array
    {
        // パスワードハッシュ化して、リクエストの配列にマージする
        $update_data = $this->getUpdateData($data, $is_checked);
        $admin->update($update_data);
        return $data;
    }

    /**
     * チェックの状態を判定し、キーを削除、もしくはマージ（ハッシュ化）後の配列を取得
     *
     * @param  array $data
     * @param  bool $is_checked
     * @return array
     */
    private function getUpdateData(array $data, bool $is_checked): array
    {
        if ($is_checked) {
            $merge_service = new MergeHashedPasswordService($data['password'], $data);
            $data = $merge_service->mergePasswordToArray();
        } else {
            unset($data['password']);
        }
        return $data;
    }

    public function deleteAdmin() 
    {
        //
    }

}
