<?php

namespace App\Console\Commands;

use Illuminate\Support\Facades\DB;

class Simularity 
{

    const VISIT_SCORE=1;
    const DOWNLOAD_SCORE=1;

    static function scoreInteraction($viewed_status, $downloaded_status) {
        return ($viewed_status * Simularity::VISIT_SCORE) + ($downloaded_status * Simularity::DOWNLOAD_SCORE);
    }

    static function getInteractionsOrderedByColumn($column_name) {
        // If I start worrying about having too big of a database, I can switch to using the "chunk" command
        return DB::table('monkeyscripts.interactions')
            ->select('user_id', 'anon_id', 'script_id', 'viewed', 'downloaded')
            ->orderBy($column_name)->get();
    }

    static function generateSimularities($interaction_scores, $algorithm="pearson") {
        $results = [];
        foreach ($interaction_scores as $entity1 => $entity1_scores) {
            foreach ($interaction_scores as $entity2 => $entity2_scores) {
                if ($entity1 == $entity2 || isset($results[$entity1][$entity2])) continue;
                    
                if ($algorithm == "pearson") {
                    [$scoreA, $scoreB] = static::pearsonScore($entity1_scores, $entity2_scores);
                } else {
                    [$scoreA, $scoreB] = static::sumScore($entity1_scores, $entity2_scores);
                }

                $results[$entity1][$entity2] = $scoreA;
                $results[$entity2][$entity1] = $scoreB; // doing both at the same time to hopefully get nlogn perf instead of n**2
            }
        }

        return $results;
    }


    private static function pearsonScore($entity1_scores, $entity2_scores) {
        // First find the entities that have shared experiences (i.e. if a single user interacted with 2 different scripts, that user would be the "intersection")
        $intersections = array_intersect(array_keys($entity1_scores), array_keys($entity2_scores));
        $num_intersections = count($intersections);

        // If there are no intersections, skip the math and return zero.
        if ($num_intersections == 0) return 0.0;

        $sum1 = 0;
        $sum2 = 0;
        $sum1_sqr = 0;
        $sum2_sqr = 0;
        $sum_product = 0;
        $pearson_score = 0.0;

        // For each intersection, we have to perform the summations of the Pearson Correlation algorithm
        foreach ($intersections as $i => $intersection_id) {
            $sum1 += $entity1_scores[$intersection_id];
            $sum2 += $entity2_scores[$intersection_id];
            $sum1_sqr += $entity1_scores[$intersection_id] ** 2;
            $sum2_sqr += $entity2_scores[$intersection_id] ** 2;
            $sum_product += $entity1_scores[$intersection_id] * $entity2_scores[$intersection_id];
        }

        // Note that, in my experience, with too few intersections/interactions this continually returns zero.
        $numerator = $sum_product - (($sum1 * $sum2) / $num_intersections);
        $denominator = sqrt(($sum1_sqr - (($sum1 ** 2) / $num_intersections)) * ($sum2_sqr - (($sum2 ** 2) / $num_intersections)));

        if ($denominator != 0) $pearson_score = $numerator / $denominator;

        // Returning an array so I can keep it consistent with other algorithms that may provide 2 different scores for each entity.
        // First element would be the score for entity1 and the second for entity2
        return [$pearson_score, $pearson_score];
    }


    // This isn't to determine simularity to a script but rather say "this is what other people who viewed this script have interacted with most"
    private static function sumScore($entity1_scores, $entity2_scores) {
        $intersections = array_intersect(array_keys($entity1_scores), array_keys($entity2_scores));
        $num_intersections = count($intersections);

        // If there are no intersections, skip the math and return zero.
        if ($num_intersections == 0) return 0.0;

        $sum1 = 0;
        $sum2 = 0;

        // print_r($entity1_scores);
        // print_r($entity2_scores);
        // print_r($intersections);
        // dd('--');

        // This isn't to determine 
        foreach ($intersections as $i => $intersection_id) {
            $sum1 += $entity1_scores[$intersection_id];
            $sum2 += $entity2_scores[$intersection_id];
        }

        return [$sum1, $sum2];

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
                    'sum_score' => $sum_score,
                    'combined_score' => ($pearson_score + 1) * $sum_score
                ];
            }
        }

        return $data;
    }
}