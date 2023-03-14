<?php

namespace App\Services\liff\order_destination;

use App\Models\User;

class FormatOrderDestinationAction
{
    /**
     * 取得したユーザーIDをマージ
     *
     * @return array
     **/
    public function mergeUserIdToArray($user, $data): array
    {
        $user_id = ['user_id' => $user->id];
        return array_merge($data, $user_id);
    }

}
