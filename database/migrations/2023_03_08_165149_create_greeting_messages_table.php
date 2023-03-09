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
        Schema::create('greeting_messages', function (Blueprint $table) {
            $table->id();
            $table->tinyInteger('type');
            $table->text('text')->nullable(true);
            $table->string('image_path')->nullable(true);
            $table->string('video_path')->nullable(true);
            $table->float('display_order')->nullable(true);
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
        Schema::dropIfExists('greeting_messages');
    }
};
