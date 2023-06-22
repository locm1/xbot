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
        Schema::create('ecommerce_configurations', function (Blueprint $table) {
            $table->id();
            $table->integer('target_amount')->nullable();
            $table->integer('postage')->nullable();
            $table->tinyInteger('is_enabled')->nullable();
            $table->integer('cash_on_delivery_fee')->nullable();
            $table->string('tel')->nullable();
            $table->string('email_sender_name')->nullable();
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
        Schema::dropIfExists('ecommerce_configurations');
    }
};
