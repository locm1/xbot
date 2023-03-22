<?php

namespace App\Services\common;

use DateTime;

class MergeArrayUtility
{
    /**
     * 取得したユーザーIDをマージ
     *
     * @return array
     **/
    public static function mergeUserIdToArray($user_id, $data): array
    {
        $user_id = ['user_id' => $user_id];
        return array_merge($data, $user_id);
    }
}
