<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SiteSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $site_setting = [
            [
                "logo_login_path" => "皓司",
                "logo_sidebar_path" => "皓司",
            ],
        ];
        DB::table('site-settings')->insert($site_setting);
    }
}
