<?php

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
        Schema::create('inviter_incentive_users', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('invite_incentive_id');
            $table->unsignedBigInteger('user_id');
            $table->tinyInteger('is_issued');
            $table->tinyInteger('usage_status');
            $table->foreign('invite_incentive_id')->references('id')->on('invite_incentives');
            $table->foreign('user_id')->references('id')->on('users');
            $table->timestamp('issued_at')->nullable();
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
        Schema::dropIfExists('invitation_users');
    }
};
