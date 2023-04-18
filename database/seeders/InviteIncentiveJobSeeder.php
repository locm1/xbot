<?php

namespace Database\Seeders;

use App\Models\InviteIncentiveJob;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class InviteIncentiveJobSeeder extends Seeder
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
                "inviter_user_id" => 1,
                "invitee_user_id" => 1,
                "invitee_line_id" => "U8e464a551171be43ead486ec63cc6ef3"
            ],
        ];
        InviteIncentiveJob::insert($data);
    }
}
