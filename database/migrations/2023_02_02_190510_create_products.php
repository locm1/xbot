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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('product_category_id');
            $table->foreign('product_category_id')->references('id')->on('product_categories');
            $table->string('name')->nullable(false);
            $table->integer('stock_quantity')->nullable(false);
            $table->double('tax_rate')->nullable(false);
            $table->integer('price')->nullable(false);
            $table->text('overview')->nullable(false);
            $table->tinyInteger('is_undisclosed');
            $table->tinyInteger('is_unlimited');
            $table->tinyInteger('is_picked_up');
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
        Schema::dropIfExists('products');
    }
};
