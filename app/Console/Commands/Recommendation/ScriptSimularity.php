<?php

namespace App\Console\Commands;

use Illuminate\Support\Facades\DB;
use App\SimilarScript;

class ScriptSimularity extends Simularity
{

    static function generate() {
        $interactions = static::getInteractionsOrderedByColumn("script_id");
        $interaction_scores = static::sortScriptInteractions($interactions);
        $pearson_scores = static::generateSimularities($interaction_scores, "pearson");
        $naive_sum_scores = static::generateSimularities($interaction_scores, "sum");
        // dd($naive_sum_scores);
        static::writeScriptSimularitiesToDB($pearson_scores, $naive_sum_scores);
    }


    static function sortScriptInteractions($interactions) {
        $script_scores = [];
        $temp_anon_map = [];
        $anon_id_counter = -1;
        
        foreach ($interactions as $interaction) {
            $script_id = $interaction->script_id;
            $user_id = $interaction->user_id;
            // dd($interaction);
            if (!isset($user_id)) {
                if(!isset($temp_anon_map[$interaction->anon_id])) {
                    $anon_id = $anon_id_counter;
                    $temp_anon_map[$interaction->anon_id] = $anon_id;
                    $anon_id_counter--;
                }
                $user_id = $anon_id;
            }
            $score = static::scoreInteraction($interaction->viewed, $interaction->downloaded);
            $script_scores[$script_id][$user_id] = $score;
        }

        return $script_scores;
    }

    static function writeScriptSimularitiesToDB($pearson_scores, $naive_sum_scores) {
        SimilarScript::truncate();
        $insert_arrays = static::createInsertArrays($pearson_scores, $naive_sum_scores);
        $chunks = array_chunk($insert_arrays, 5000);
        foreach ($chunks as $chunk) {
            SimilarScript::insert($chunk);
        }
    }



}