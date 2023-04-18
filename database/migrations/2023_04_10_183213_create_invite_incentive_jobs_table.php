<?php

use App\Models\InviteIncentive;
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
        Schema::create('invite_incentive_jobs', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(InviteIncentive::class);
            $table->foreignIdFor(User::class, 'inviter_user_id');
            $table->foreignIdFor(User::class, 'invitee_user_id')->nullable();
            $table->string('invitee_line_id');
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
        Schema::dropIfExists('invitee_users');
    }
};
