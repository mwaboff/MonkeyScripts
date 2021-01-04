<?php

namespace App;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;


use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Scout\Searchable;

use App\Script;
use App\Interaction;

class User extends Authenticatable
{
    use Notifiable;
    use HasApiTokens;
    use SoftDeletes;
    use Searchable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    protected $dates = ['deleted_at'];

    /**
     * Get all scripts for this user.
     * 
     * @return Array
     */
    public function scripts() {
        return $this->hasMany('App\Script', 'author_id');
    }

    /**
     * Get all ratings for this user. NOT IMPLEMENTED
     * 
     * @return Array
     */
    public function ratings() {
        return $this->hasMany('App\Rating', 'user_id');
    }

    /**
     * Convert the model parementers into an array that Algolia search needs to index the model
     */

    public function toSearchableArray()
    {
        $array = [
            $this->name 
        ];

        return $array;
    }

    /**
     * Get a list of all scripts that a user interacted with (downloaded or visited)
     */
    public function getInteractedScripts() {
        return Interaction::getAllInteractedScriptsByUser($this->id, $visited=true, $downloaded=true, $and=false);
    }

    /**
     * Get a list of all scripts that a user both downloaded and visited
     */
    public function getDownloadedScripts() {
        return Interaction::getAllInteractedScriptsByUser($this->id, $visited=true, $downloaded=true);
    }
}
