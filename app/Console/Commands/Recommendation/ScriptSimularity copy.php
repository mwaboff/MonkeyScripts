<?php

namespace App\Console\Commands;

use Illuminate\Support\Facades\DB;
// use App\Http\ScriptSimularity;

class ScriptSimularity extends Simularity
{

    static function generate() {
        $interactions = static::getInteractionsOrderedByScriptID();
        $interaction_scores = static::sortScriptInteractions($interactions);
        $simularity_scores = static::generateSimularities($interaction_scores);
        static::writeSimularitiesToDB($simularity_scores);
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
            // if (isset(..) || array_key_exists(...))
            if (!in_array($script_id, array_keys($script_scores))) $script_scores[$script_id] = [];

            $script_scores[$script_id][$user_id] = $score;
        }
        return $script_scores;
    }

    static function generateSimularities($interaction_scores) {
        $results = [];
        foreach ($interaction_scores as $scriptA => $user_scoresA) {
            if (!in_array($scriptA, array_keys($results))) $results[$scriptA] = [];

            foreach ($interaction_scores as $scriptB => $user_scoresB) {
                if (static::isAlreadyCalculated($scriptA, $scriptB, $results)) break;

                $scores = static::calculateSimularityScore($scriptA, $user_scoresA, $scriptB, $user_scoresB);

                $results[$scriptA][$scriptB] = $scores['script_scoreB'];
                $results[$scriptB][$scriptA] = $scores['script_scoreA']; // doing both at the same time to hopefully get nlogn perf instead of n**2
            }
        }

        return $results;

    }

    static function writeSimularitiesToDB($scores) {
        $scr = 0;
        $chunks = array_chunk($scores, 5000);
        foreach ($chunks as $chunk) {
            static::writeSimilaritiesByChunk($chunk);
        }
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

    // We want to skip simularity generation if we have already worked on this script.
    static function isAlreadyCalculated($scriptA, $scriptB, $results) {
        return ($scriptA == $scriptB) || in_array($scriptB, array_keys($results[$scriptA]));
    }

    static function calculateSimularityScore($scriptA, $user_scoresA, $scriptB, $user_scoresB) {
        $scoreA = 0;
        $scoreB = 0;
        $user_idsA = array_keys($user_scoresA);
        $user_idsB = array_keys($user_scoresB);
        $intersected_users = array_intersect($user_idsA, $user_idsB);

        foreach ($intersected_users as $user_id) {
            $scoreA += $user_scoresA[$user_id];
            $scoreB += $user_scoresB[$user_id];
        }

        return [
            'script_scoreA' => $scoreA,
            'script_scoreB' => $scoreB
        ];
    }
}