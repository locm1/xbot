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
     * undocumented function summary
     *
     * Undocumented function long description
     *
     * @param Type $var Description
     * @return type
     * @throws array
     **/
    public function mergePasswordToArray(): array
    {
        $password = ['password' => $this->hashPassword()];
        return array_merge($this->data, $password);
    }

}
