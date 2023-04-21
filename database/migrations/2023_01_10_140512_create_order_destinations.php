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
        Schema::create('order_destinations', function (Blueprint $table) {
            $table->id();
            $table->string('first_name', 255)->nullable();
            $table->string('first_name_kana', 255)->nullable();
            $table->string('last_name', 255)->nullable();
            $table->string('last_name_kana', 255)->nullable();
            $table->string('zipcode', 255)->nullable();
            $table->string('prefecture', 255)->nullable();
            $table->text('city')->nullable();
            $table->text('address')->nullable();
            $table->text('building_name')->nullable();
            $table->string('tel', 255)->nullable();
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
        Schema::dropIfExists('order_users');
    }
};
