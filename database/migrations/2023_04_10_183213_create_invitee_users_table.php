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
        Schema::create('invitee_users', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('inviter_user_id');
            $table->string('line_id');
            $table->string('version_key');
            $table->foreign('inviter_user_id')->references('id')->on('users');
            $table->timestamp('invited_at')->nullable();
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
