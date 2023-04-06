<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class InflowRouteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $inflow_route = [
            [
                "name" => "test1",
                "key" => $this->getRandomAlphanumeric(),
                "count" => 2,
            ],
            [
                "name" => "test2",
                "key" => $this->getRandomAlphanumeric(),
                "count" => 0,
            ],
            [
                "name" => "test3",
                "key" => $this->getRandomAlphanumeric(),
                "count" => 1,
            ],
        ];
        DB::table('inflow_routes')->insert($inflow_route);
    }

    private function getRandomAlphanumeric()
    {
        $str = '1234567890abcdefghijklmnopqrstuvwxyz';
        return substr(str_shuffle($str), 0, 15);
    }
}
