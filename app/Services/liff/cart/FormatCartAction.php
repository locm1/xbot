<?php

namespace App\Services\liff\cart;

use App\Models\User;

class FormatCartAction
{
    /**
     * 取得したユーザーIDをマージ
     *
     * @return array
     **/
    public function mergeUserIdToArray($user_id, $data): array
    {
        $user_id = ['user_id' => $user_id];
        return array_merge($data, $user_id);
    }

}
