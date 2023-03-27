<?php

use App\Models\Message;
use App\Models\SendMessage;
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
        Schema::create('send_message_jobs', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(SendMessage::class);
            $table->dateTime('reservation_at');
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
        Schema::dropIfExists('send_message_jobs');
    }
};
