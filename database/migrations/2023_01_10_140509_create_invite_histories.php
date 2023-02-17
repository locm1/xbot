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
        Schema::create('invite_histories', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('inviter_user_id');
            $table->unsignedBigInteger('invitee_user_id')->unique();
            $table->foreign('inviter_user_id')->references('id')->on('users');
            $table->foreign('invitee_user_id')->references('id')->on('users');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('invite_histories');
    }
};
