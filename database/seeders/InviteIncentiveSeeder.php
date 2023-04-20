<?php

namespace Database\Seeders;

use App\Models\InviteIncentive;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class InviteIncentiveSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            [
                "name" => "インセンテスト",
                "inviter_timing" => 1,
                "inviter_format" => 1,
                "inviter_title" => "クーポンタイトル招待側",
                "inviter_content" => "クーポンタイトル中身",
                "invitee_timing" => 3,
                "invitee_format" => 1,
                "invitee_title" => "クーポンタイトル招待側",
                "invitee_content" => "クーポンタイトル中身",
                "version_key" => "12345"
            ],
        ];
        InviteIncentive::insert($data);
    }
}
