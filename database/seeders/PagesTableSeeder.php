<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PagesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $pages = [
            ['name' => 'ダッシュボード', 'path' => 'dashboard', 'role' => 3],
            ['name' => '顧客管理', 'path' => 'user', 'role' => 3],
            ['name' => 'セグメント配信', 'path' => 'message', 'role' => 3],
            ['name' => '来店・販促管理', 'path' => 'visitor', 'role' => 3],
            ['name' => 'EC管理', 'path' => 'ec', 'role' => 3],
            ['name' => '予約管理', 'path' => 'event', 'role' => 3],
            ['name' => '友達紹介管理', 'path' => 'invitation', 'role' => 3],
            ['name' => 'アンケート管理', 'path' => 'questionnaire', 'role' => 3],
            ['name' => 'アカウント管理', 'path' => 'account', 'role' => 3],
        ];
        DB::table('pages')->insert($pages);
    }
}
