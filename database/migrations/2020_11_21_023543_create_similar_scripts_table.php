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
            $table->foreignId('elem1_id');
            $table->foreignId('elem2_id');
            $table->double('pearson_score', 8, 4)->default(0.0); // 00000000.0000
            $table->integer('sum_score')->default(0);
            $table->double('combined_score', 10, 2)->default(0.0);
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
