<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SimilarScript extends Model
{
    //

    protected $fillable = [
        'script_id', 'similar_id', 'score'
    ];

}
