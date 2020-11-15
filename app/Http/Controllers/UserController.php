<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use \Laravel\Passport\Http\Controllers\AccessTokenController;


use App\User;

class UserController extends Controller
{

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        // //Checks the validity of the the request
        $validated_data = $request->validate([
            'name' => ['required', 'unique:users', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        $new_user = User::create([
            'name' => $request['name'],
            'email' => $request['email'],
            'password' => Hash::make($request['password']),
        ]);

        return "{message: success}";
    }

    public function info(Request $request)
    {
        $id = $request["id"];
        $user = User::findOrFail($id);
        $script_list = ScriptsController::getScriptsByUser($id);
        
        return json_encode([
            "name" => $user->name,
            "num_scripts" => count($script_list),
            "script_list" => $script_list,
            "join_date" => $user->created_at
        ]);
    }

    public function whoAmI(Request $request) {
        
        return json_encode(api("auth")->user());
    }

}
