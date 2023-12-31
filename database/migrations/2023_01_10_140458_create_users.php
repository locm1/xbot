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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('first_name', 50)->nullable(true);
            $table->string('last_name', 50)->nullable(true);
            $table->string('first_name_kana', 50)->nullable(true);
            $table->string('last_name_kana', 50)->nullable(true);
            $table->string('nickname', 50)->nullable(false);
            $table->text('status_message')->nullable(true);
            $table->date('birth_date')->nullable(true);
            $table->tinyInteger('gender')->nullable(true);
            $table->string('zipcode')->nullable(true);
            $table->string('prefecture')->nullable(true);
            $table->string('city')->nullable(true);
            $table->string('address')->nullable(true);
            $table->string('building_name')->nullable(true);
            $table->string('tel', 50)->nullable(true);
            $table->foreignId('occupation_id')->nullable(true)->constrained('occupations');
            $table->text('img_path')->nullable(true);
            $table->string('line_id')->nullable(false);
            $table->tinyInteger('is_registered');
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
        Schema::dropIfExists('users');
    }
};
