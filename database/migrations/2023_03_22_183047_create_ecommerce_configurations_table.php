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
            $table->integer('target_amount');
            $table->integer('postage');
            $table->tinyInteger('is_enabled');
            $table->integer('cash_on_delivery_fee')->nullable();
            $table->string('tel');
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
