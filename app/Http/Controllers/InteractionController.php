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
        if(isset($visitor_user)) {
            $interaction = Interaction::createOrUpdateInteraction($visitor_user->id, $script_id, $data['visited'], $data['downloaded']);   
        }
    }
}
