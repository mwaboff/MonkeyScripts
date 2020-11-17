<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Interaction extends Model
{
    protected $fillable = [
        'user_id', 'script_id', 'viewed', 'downloaded'
    ];

    public function script() {
        return $this->belongsTo('App\Script', 'script_id');
    }

    public function user() {
        return $this->belongsTo('App\User', 'user_id');
    }

    public static function createOrUpdateInteraction($user_id, $script_id, $viewed, $downloaded) {
        if ($user_id == "0") {
            $script = static::createAnonInteraction($script_id, $viewed, $downloaded);
        } else {
            $script = static::createOrUpdateUserInteraction($user_id, $script_id, $viewed, $downloaded);
        }

        return $script;

    }

    private static function createAnonInteraction($script_id, $viewed, $downloaded) {
        return;
    }

    private static function createOrUpdateUserInteraction($user_id, $script_id, $viewed, $downloaded) {
        $script = Interaction::where('user_id', $user_id)->where('script_id', $script_id)->first();
        if ($script) {
            $viewed == 1 ? $script->viewed = 1 : '';
            $downloaded == 1 ? $script->downloaded = 1 : '';
            $script->save();
        } else {
            $script = Interaction::create([
                "user_id" => $user_id,
                "script_id" => $script_id,
                "viewed" => $viewed,
                "downloaded" => $downloaded
            ]);
        }

        return $script;
    }


}
