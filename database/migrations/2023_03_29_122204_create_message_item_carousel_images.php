<?php

use App\Models\MessageItem;
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
        Schema::create('message_item_carousel_images', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(MessageItem::class);
            $table->string('image_path')->nullable(false);
            $table->string('label')->nullable(false);
            $table->string('uri')->nullable(false);
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
        Schema::dropIfExists('message_item_carousel_images');
    }
};
