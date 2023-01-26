<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AdminTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $admins = [
            'login_id' => 'admin',
            'name' => '管理者用アカウント',
            'role' => 1,
            'password' => bcrypt('admin2345'),
        ];
        DB::table('admins')->insert($admins);
    }
}
