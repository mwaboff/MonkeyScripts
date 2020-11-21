<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSimilarScriptsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('similar_scripts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('script_id');
            $table->foreignId('similar_id');
            $table->double('score', 8, 2)->default(0); // 00000000.00

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
        Schema::dropIfExists('similar_scripts');
    }
}
