<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Scout\Searchable;


class Script extends Model
{
    use SoftDeletes;
    use Searchable;

    protected $fillable = [
        'title', 'description', 'summary', 'code', 'author_id',
    ];

    protected $dates = ['deleted_at'];


    public function author() {
        return $this->belongsTo('App\User');
    }

    public function ratings() {
        return $this->hasMany('App\Rating', 'script_id');
    }
}
