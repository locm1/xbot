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
        Schema::create('invite_incentives', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->tinyInteger('inviter_timing');
            $table->tinyInteger('inviter_format');
            $table->string('inviter_title');
            $table->string('inviter_content');
            $table->tinyInteger('invitee_timing');
            $table->tinyInteger('invitee_format');
            $table->string('invitee_title');
            $table->string('invitee_content');
            $table->string('version_key');
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
        Schema::dropIfExists('invitations');
    }
};
