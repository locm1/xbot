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
        Schema::create('default_invite_incentives', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('invite_incentive_id');
            $table->foreign('invite_incentive_id')->references('id')->on('invite_incentives');
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
        Schema::dropIfExists('default_invite_incentives');
    }
};
