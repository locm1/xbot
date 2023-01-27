<?php

namespace App\Services\management\admin;

class FormatAdminAction
{

    private $data;

    public function __construct(array $data)
    {
        $this->data = $data;
    }

    /**
     * チェックの状態を判定し、キーを削除、もしくはマージ（ハッシュ化）
     *
     * @return array
     */
    public function getUpdateData($is_checked): array
    {
        if ($is_checked) {
            return $this->mergePasswordToArray();
        }
        
        unset($this->data['password']);
        return $this->data;
    }

    /**
     * 取得したパスワードをハッシュ化する
     * @return string
     **/
    private function hashPassword(): string
    {
        return bcrypt($this->data['password']);
    }

    /**
     * ハッシュ化したパスワードをマージ
     *
     * @return array
     **/
    public function mergePasswordToArray(): array
    {
        $password = ['password' => $this->hashPassword()];
        return array_merge($this->data, $password);
    }

}
