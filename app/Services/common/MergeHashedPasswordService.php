<?php

namespace App\Services\common;


class MergeHashedPasswordService
{
    private $password;
    private $data;

    public function __construct(string $password, array $data)
    {
        $this->password = $password;
        $this->data = $data;
    }
    
    /**
     * 取得したパスワードをハッシュ化する
     * @return string
     **/
    private function hashPassword(): string
    {
        return bcrypt($this->password);
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
