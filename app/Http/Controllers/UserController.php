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

        $result = [];

        $existing_user_count = User::where('name', $request['name'])->count();
        $existing_email_count = User::where('email', $request['email'])->count();

        if ($existing_email_count > 0) return json_encode(['success'=>false, 'message' => 'Email is already used']);
        if ($existing_user_count > 0) return json_encode(['success'=>false, 'message' => 'Username is taken']);



        // //Checks the validity of the the request
        $validated_data = $request->validate([
            'name' => ['required', 'unique:users', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users', 'min:5'],
            'password' => ['required', 'string', 'min:8', 'max:255', 'confirmed'],
        ]);

        $user = User::create([
            'name' => $request['name'],
            'email' => $request['email'],
            'password' => Hash::make($request['password']),
        ]);

        

        if ($user) {
            $result = [
                'success' => true,
                'message' => 'success',
                'email' => $user->email,
                'uid' => $user->uid
            ];
        } else {
            $result = [
                'message' => 'failure'
            ];
        }

        return json_encode($result);
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

    // This will return null if noone is logged in
    public static function currentLoggedInUser(Request $request) {
        $bearer_token = $request->header('Authorization');
        return PassportUserVerifyController::getUser($bearer_token); 
    }

}
