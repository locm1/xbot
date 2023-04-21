<?php

namespace Database\Seeders;

use App\Models\UserInfoStatus;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserInfoStatusTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user_info_statuses = array();
        $names = [
            '氏名',
            'フリガナ',
            '生年月日',
            '性別',
            '電話番号',
            'ご職業',
            '郵便番号',
            '都道府県',
            '市区町村',
            '丁目・番地・号',
            '建物名/会社名',
            '部屋番号',
        ];

        foreach ($names as $name) {
            $user_info_statuses[] = [
                'name' => $name,
                'is_undisclosed' => 0,
                'is_required' => 1,
            ];
        }

        UserInfoStatus::insert($user_info_statuses);
    }
}
