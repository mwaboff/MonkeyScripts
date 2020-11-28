<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInteractionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('interactions', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('user_id')->nullable()->default(null);
            $table->string('anon_id', 40)->nullable()->default(null);
            $table->foreignId('script_id');
            $table->boolean('viewed')->default(0);
            $table->boolean('downloaded')->default(0);
            $table->index('user_id');
            $table->index('anon_id');
            $table->index('script_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('interactions');
    }
}
