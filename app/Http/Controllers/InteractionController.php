<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Controllers\PassportUserVerifyController;

use App\Interaction;

class InteractionController extends Controller
{
    //
    public static function processInteraction(Request $request, $script_id, $data)
    {
        $bearer_token = $request->header('Authorization');
        $visitor_user = PassportUserVerifyController::getUser($bearer_token);
        $visitor_id = isset($visitor_user) ? $visitor_user->id : null;
        $anon_id = sha1($request->ip() . " " . $request->userAgent());
        $interaction = Interaction::createOrUpdateInteraction($visitor_id, $anon_id, $script_id, $data['visited'], $data['downloaded']);
    }

    public static function createUniqueId(Request $request) {
        return sha1($request->ip() + $request->userAgent());
    }
}
