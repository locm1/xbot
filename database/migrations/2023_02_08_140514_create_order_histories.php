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
        Schema::create('order_histories', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('order_destination_id');
            // $table->unsignedBigInteger('delivery_address_id');
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('order_destination_id')->references('id')->on('order_destinations');
            // $table->foreign('delivery_address_id')->references('id')->on('delivery_addresses');
            $table->tinyInteger('delivery_time')->nullable(false);
            $table->integer('purchase_amount')->nullable(false);
            $table->tinyInteger('status')->nullable(false);
            $table->tinyInteger('payment_method')->nullable(false);
            $table->integer('shipping_fee')->nullable(false);
            $table->unsignedBigInteger('coupon_id');
            $table->foreign('coupon_id')->references('id')->on('coupons');
            $table->integer('tax')->nullable(false);
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
        Schema::dropIfExists('order_histories');
    }
};
