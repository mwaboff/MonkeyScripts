<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDelete;


class Script extends Model
{
    protected $fillable = [ ];

    protected $dates = ['deleted_at'];


    public function author() {
        return $this->belongsTo('App\User');
    }

    public function ratings() {
        return $this->hasMany('App\Rating', 'script_id');
    }
}
