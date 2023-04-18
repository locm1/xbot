<?php

namespace Database\Seeders;

use App\Models\InviteeIncentive;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class InviteeIncentiveSeeder extends Seeder
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
                "invite_incentive_id" => 1,
                "user_id" => 1,
                "invite_incentive_job_id" => 1,
                "is_used" => 0,
            ],
        ];
        InviteeIncentive::insert($data);
    }
}
