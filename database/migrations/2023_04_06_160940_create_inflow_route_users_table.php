<?php

use App\Models\InflowRoute;
use App\Models\User;
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
        Schema::create('inflow_route_users', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(InflowRoute::class);
            $table->string('line_id');
            $table->foreignIdFor(User::class)->nullable();
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
        Schema::dropIfExists('inflow_route_users');
    }
};
