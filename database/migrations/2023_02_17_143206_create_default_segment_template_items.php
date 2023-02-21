<?php

use App\Models\DefaultSegmentItem;
use App\Models\SegmentTemplate;
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
        Schema::create('default_segment_template_items', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(DefaultSegmentItem::class);
            $table->foreignIdFor(SegmentTemplate::class);
            $table->string('value');
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
        Schema::dropIfExists('default_segment_template_items');
    }
};
