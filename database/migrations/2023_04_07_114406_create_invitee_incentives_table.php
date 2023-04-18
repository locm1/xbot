<?php

use App\Models\InviteIncentive;
use App\Models\InviteIncentiveJob;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('invitee_incentives', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(InviteIncentive::class);
            $table->foreignIdFor(User::class);
            $table->foreignIdFor(InviteIncentiveJob::class);
            $table->tinyInteger('is_used')->default(0);
            $table->timestamp('used_at')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('invitee_incentive_users', function (Blueprint $table) {
            //
        });
    }
};
