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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users');
            $table->string('first_name', 255)->nullable(false);
            $table->string('first_name_kana', 255)->nullable(false);
            $table->string('last_name', 255)->nullable(false);
            $table->string('last_name_kana', 255)->nullable(false);
            $table->string('zipcode', 255)->nullable(false);
            $table->string('prefecture', 255)->nullable(false);
            $table->text('city')->nullable(false);
            $table->text('address')->nullable(false);
            $table->text('building_name')->nullable(true);
            $table->string('tel', 255)->nullable(false);
            $table->tinyInteger('delivery_time')->nullable(false);
            $table->integer('purchase_amount')->nullable(false);
            $table->tinyInteger('status')->nullable(false);
            $table->tinyInteger('payment_method')->nullable(false);
            $table->integer('shipping_fee')->nullable(false);
            $table->unsignedBigInteger('coupon_id');
            $table->foreign('coupon_id')->references('id')->on('coupons')->nullable();
            $table->integer('tax')->nullable(false);
            $table->string('payjp_url')->nullable();
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
