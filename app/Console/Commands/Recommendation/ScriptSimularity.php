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
        static::writeScriptSimularitiesToDB($pearson_scores, $naive_sum_scores);
        // print_r($pearson_scores);
    }


    static function sortScriptInteractions($interactions) {
        $script_scores = [];
        
        foreach ($interactions as $interaction) {
            $script_id = $interaction->script_id;
            $user_id = $interaction->user_id;
            $score = static::scoreInteraction($interaction->viewed, $interaction->downloaded);
            $script_scores[$script_id][$user_id] = $score;
        }
        return $script_scores;
    }

    static function writeScriptSimularitiesToDB($pearson_scores, $naive_sum_scores) {
        $insert_arrays = static::createInsertArrays($pearson_scores, $naive_sum_scores);
        $chunks = array_chunk($insert_arrays, 5000);
        foreach ($chunks as $chunk) {
            SimilarScript::insert($chunk);
        }
    }

    static function createInsertArrays($pearson_scores, $naive_sum_scores) {
        $data = [];
        foreach ($pearson_scores as $elem1_id => $elem1_pearson_scores) {
            foreach($elem1_pearson_scores as $elem2_id => $pearson_score) {
                $pearson_score = $pearson_scores[$elem1_id][$elem2_id] ? $pearson_scores[$elem1_id][$elem2_id] : 0;
                $sum_score = $naive_sum_scores[$elem1_id][$elem2_id] ? $naive_sum_scores[$elem1_id][$elem2_id] : 0;
                
                $data[] = [
                    'elem1_id' => $elem1_id,
                    'elem2_id' => $elem2_id,
                    'pearson_score' => $pearson_score,
                    'sum_score' => $sum_score
                ];
            }
        }

        return $data;
    }

}