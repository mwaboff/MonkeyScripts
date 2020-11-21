<?php

namespace App\Console\Commands;

use Illuminate\Support\Facades\DB;

class Simularity 
{

    const VISIT_SCORE=1;
    const DOWNLOAD_SCORE=1;

    static function getInteractionsOrderedByColumn($column_name) {
        // If I start worrying about having too big of a database, I can switch to using the "chunk" command
        return DB::table('monkeyscripts.interactions')
            ->select('user_id', 'script_id', 'viewed', 'downloaded')
            ->orderBy($column_name)->get();
    }
}