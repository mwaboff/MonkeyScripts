<?php

namespace App\Console\Commands\Recommendation;
use App\SimilarScript;

class ScriptSimularity extends Simularity
{

    static function generate() {
        $interactions = static::getInteractionsOrderedByColumn("script_id");
        $interaction_scores = static::sortScriptInteractions($interactions);
        $pearson_scores = static::generateSimularities($interaction_scores, "pearson");
        $naive_sum_scores = static::generateSimularities($interaction_scores, "sum");
        static::writeScriptSimularitiesToDB($pearson_scores, $naive_sum_scores);
    }

    /**
     * Loop through each interaction and calculate a score for each. If the interaction is done by an anonymous user, 
     *   generate a negative ID (to not conflict) with the users.
     * 
     * @param Array $interactions
     * @return Array $script_scores
     */
    static function sortScriptInteractions($interactions) {
        $script_scores = [];
        $temp_anon_map = [];
        $anon_id_counter = -1;
        
        foreach ($interactions as $interaction) {
            $script_id = $interaction->script_id;
            $user_id = $interaction->user_id;
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
        // In case the score arrays get very large, chunk them into smaller portions before writing to the DB.
        $chunks = array_chunk($insert_arrays, 5000);
        foreach ($chunks as $chunk) {
            SimilarScript::insert($chunk);
        }
    }



}