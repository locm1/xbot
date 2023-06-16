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
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('title', 50)->nullable(true);
            $table->dateTime('start_date')->nullable(true);
            $table->dateTime('end_date')->nullable(true);
            $table->string('location', 255)->nullable(true);
            $table->integer('remaining')->nullable(false);
            $table->tinyInteger('is_unlimited')->default(0)->nullable(false);
            // $table->string('color', 50)->nullable(false);
            $table->dateTime('deadline')->nullable(true);
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
        Schema::dropIfExists('events');
    }
};
