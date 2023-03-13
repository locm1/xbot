<?php

namespace App\Services\liff\cart;

use App\Models\User;

class FormatCartAction
{
    /**
     * LINE APIから取得したLINEのユーザーIDからユーザーを特定
     *
     * @return string
     */
    private function getUser($line_id): string
    {
        $user = User::where('line_id', $line_id)->first();
        return $user->user_id;
    }

    /**
     * 取得したユーザーIDをマージ
     *
     * @return array
     **/
    public function mergeUserIdToArray($line_id, $data): array
    {
        $user_id = ['user_id' => $this->getUser($line_id)];
        return array_merge($data, $user_id);
    }

}
