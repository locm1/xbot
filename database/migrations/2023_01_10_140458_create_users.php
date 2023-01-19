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
            $table->string('first_name', 50)->nullable(false);
            $table->string('last_name', 50)->nullable(false);
            $table->string('first_name_kana', 50)->nullable(false);
            $table->string('last_name_kana', 50)->nullable(false);
            $table->string('nickname', 50)->nullable(false);
            $table->date('birth_date')->nullable(false);
            $table->tinyInteger('sex')->nullable(false);
            $table->string('area', 50)->nullable(false);
            $table->string('tel', 50)->nullable(false);
            $table->string('occupation', 50)->nullable(false);
            $table->tinyInteger('is_registered')->nullable(false);
            $table->text('line_id')->nullable(false);
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
