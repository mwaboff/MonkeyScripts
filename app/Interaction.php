<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

use App\Script;


class Interaction extends Model
{
    protected $fillable = [
        'user_id', 'anon_id', 'script_id', 'viewed', 'downloaded'
    ];

    public function script() {
        return $this->belongsTo('App\Script', 'script_id');
    }

    public function user() {
        return $this->belongsTo('App\User', 'user_id');
    }

    public static function createOrUpdateInteraction($user_id, $anon_id, $script_id, $viewed, $downloaded) {
        if (isset($user_id)) $anon_id = null;
        $interaction = Interaction::where('script_id', $script_id)->where('user_id', $user_id)->where('anon_id', $anon_id)->first();
        if ($interaction) {
            static::updateInteraction($interaction, $viewed, $downloaded);
        } else {
            static::createInteraction($user_id, $anon_id, $script_id, $viewed, $downloaded);
        }
    }

    private static function updateInteraction($interaction, $viewed, $downloaded) {
        $viewed == 1 ? $interaction->viewed = 1 : '';
        $downloaded == 1 ? $interaction->downloaded = 1 : '';
        $interaction->updated_at = date('Y-m-d H:i:s');
        $interaction->save();
    }

    private static function createInteraction($user_id, $anon_id, $script_id, $viewed, $downloaded) {
        Interaction::create([
            "user_id" => $user_id,
            "anon_id" => $anon_id,
            "script_id" => $script_id,
            "viewed" => $viewed,
            "downloaded" => $downloaded
        ]);
    }

    // private static function createOrUpdateUserInteraction($user_id, $script_id, $viewed, $downloaded) {
    //     $script = Interaction::where('user_id', $user_id)->where('script_id', $script_id)->first();
    //     if ($script) {
    //         $viewed == 1 ? $script->viewed = 1 : '';
    //         $downloaded == 1 ? $script->downloaded = 1 : '';
    //         $script->save();
    //     } else {
    //         $script = Interaction::create([
    //             "user_id" => $user_id,
    //             "anon_id" => $anon_id,
    //             "script_id" => $script_id,
    //             "viewed" => $viewed,
    //             "downloaded" => $downloaded
    //         ]);
    //     }

    //     return $script;
    // }

    public static function getAllInteractedScriptsByUser($user_id, $viewed=true, $downloaded=true, $and=true) {
        $results = [];
        $query = DB::table('monkeyscripts.interactions')->where('user_id', $user_id);

        if ($and) {
            $query = $query->where('viewed', $viewed)->where('downloaded', $downloaded);
        } else {
            $query =$query->where('viewed', $viewed)->orWhere('downloaded', $downloaded);
        }

        $similar_ids = $query->orderBy('updated_at', 'DESC')->pluck('script_id');

        foreach ($similar_ids as $script_id) {
            $script = Script::find($script_id);
            isset($script) ? ($results[] = $script) : null;
        }

        return $results;
    }


}
