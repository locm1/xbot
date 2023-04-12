<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = [
            [
                "first_name" => "皓司",
                "last_name" => "米塚",
                "first_name_kana" => "コウジ",
                "last_name_kana" => "ヨネツカ",
                "nickname" => "米塚皓司",
                "status_message" => "ping",
                "birth_date" => "1996-10-24",
                "gender" => 1,
                "zipcode" => "0640809",
                "prefecture" => "北海道",
                "city" => "札幌市中央区",
                "address" => "南九条西9丁目3-30-202",
                "building_name" => "建物 1",
                "tel" => "09064409121",
                "occupation_id" => null,
                "img_path" => "https://sprofile.line-scdn.net/0hYn1UuJjhBkEcLBBfCON4Pmx8BSs_XV9TY0pOIS8qX3UhHEUXZUtMJ3opXHVyFBQQZEocJy8rCiUQP3EnAnr6dRscWHYmHUYfME5Iog",
                "line_id" => "U8e464a551171be43ead486ec63cc6ef3",
                "is_registered" => 1,
                "deleted_at" => null,
                "block_date" => "2023-03-23 13:33:52",
                "is_blocked" => 0,
            ],
        ];
        DB::table('users')->insert($users);
    }
}
