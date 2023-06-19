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
                "logo_login_path" => "/images/logo_login.png",
                "logo_sidebar_path" => "/images/logo_admin.png",
            ],
        ];
        DB::table('site_settings')->insert($site_setting);
    }
}
