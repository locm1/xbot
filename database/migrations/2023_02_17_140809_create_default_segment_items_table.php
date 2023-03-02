<?php

use App\Models\DefaultSegment;
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
        Schema::create('default_segment_items', function (Blueprint $table) {
            $table->id();
            $table->string('label');
            $table->string('value');
            $table->foreignIdFor(DefaultSegment::class);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('default_segment_items');
    }
};
