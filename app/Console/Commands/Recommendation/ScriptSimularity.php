<?php

namespace App\Console\Commands;

use Illuminate\Support\Facades\DB;
// use App\Http\ScriptSimularity;

class ScriptSimularity extends Simularity
{

    static function generate() {
        $interactions = static::getInteractionsOrderedByScriptID();
        $interaction_scores = static::sortScriptInteractions($interactions);
        $pearson_scores = static::generateSimularities($interaction_scores, "pearson");
        $naive_sum_scores = static::generateSimularities($interaction_scores, "sum");
        // static::writeScriptSimularitiesToDB($pearson_scores, $naive_sum_scores);
        print_r($pearson_scores);
    }

    private static function getInteractionsOrderedByScriptID() {
        return static::getInteractionsOrderedByColumn("script_id");
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

    static function writeSimularitiesToDB($pearson_scores, $naive_sum_scores) {
        $chunks = array_chunk($scores, 5000);
        $pearson_insert_lines = static::createInsertLines($pearson_scores);
        foreach ($chunks as $chunk) {
            static::writeSimilaritiesByChunk($chunk);
        }
    }

    static function createInsertLines() {

    }

    private static function writeSimilaritiesByChunk($chunk) {
        foreach ($chunk as $scriptA => $scriptBs) {
            foreach ($scriptBs as $scriptB => $score) {

            }
        }
    }

    static function scoreInteraction($viewed_status, $downloaded_status) {
        return ($viewed_status * Simularity::VISIT_SCORE) + ($downloaded_status * Simularity::DOWNLOAD_SCORE);
    }

}