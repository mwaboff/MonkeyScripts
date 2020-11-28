<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Scout\Searchable;

use App\User;


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

    // Need to add this so we can use array_unique when creating automated lists.
    public function __toString() {
        return "Script #$this->id - $this->title";
    }

    public function toSearchableArray()
    {
        $author_name = User::find($this->author_id);
        // $array = $this->toArray();
        $array = [
            $this->title, $this->description, $this->summary, $author_name 
        ];

        return $array;
    }

    public function getCreatedDay()
    {
        return date('F jS, Y', strtotime($this->created_at)); // Will output date in this format: November 27th, 2020
    }

    public function getUpdatedDay()
    {
        return date('F jS, Y', strtotime($this->updated_at));

    }

    public function getDownloadCount() {
        return Interaction::where('script_id', $this->id)->where('downloaded', 1)->count();
    }
}
