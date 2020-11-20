<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class ScriptSimularity {
    static function getInteractionList() {
        return DB::select('select * from monkeyscripts.interactions');
    }

    static function main() {
        $scripts = static::getInteractionList();
        echo $scripts;
    }
}