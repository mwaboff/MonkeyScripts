<?php

namespace App\Console\Commands;

use App\Console\Commands\Recommendation\ScriptSimularity;

use Illuminate\Console\Command;

class CalculateSimularities extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'recommendation:generate {type}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'This script generates the simularities of scripts and users based off of interactions made on the site.';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $generator_type = $this->argument('type');
        if ($generator_type == 'user') {

        } elseif ($generator_type == 'script') {
            ScriptSimularity::generate();
        }
        return 0;
    }
}
