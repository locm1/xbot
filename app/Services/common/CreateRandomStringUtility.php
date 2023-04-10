<?php

namespace App\Services\common;

class CreateRandomStringUtility
{
    public static function createRandomString($length)
    {
        return substr(str_shuffle('1234567890abcdefghijklmnopqrstuvwxyz'), 0, $length);
    }
}
