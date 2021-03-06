<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use \Laravel\Passport\Http\Controllers\AccessTokenController;


use App\User;
use App\VerificationCode;
use Illuminate\Auth\Notifications\VerifyEmail;

use App\Mail\VerificationEmail;
use Illuminate\Support\Facades\Mail;


class UserController extends Controller
{

    /**
     * Accept api request to create a new User.
     *
     * @return json array
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

            static::sendValidateEmail($user);
        } else {
            $result = [
                'message' => 'failure'
            ];
        }

        return json_encode($result);
    }


    /**
     * Return user metadata from API request.
     *
     * @return json array
     */
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

    /**
     * Accept api request to create a new User. Will return null if noone is logged in
     *
     * @param  \Request $request
     * @return User
     */
    public static function currentLoggedInUser(Request $request) {
        $bearer_token = $request->header('Authorization');
        return PassportUserVerifyController::getUser($bearer_token); 
    }

    
    /**
     * Initialize a new verification code and send it to the provided user.
     * 
     * @param  \User $user
     */
    public static function sendValidateEmail(User $user) {
        $verification_code = VerificationCode::create([
            'user_id' => $user->id
        ]);
        $data = [
            'username' => $user->name,
            'activation_code' => $verification_code->code
        ];
        Mail::to($user->email)->send(new VerificationEmail($data));
    }

    /**
     * Verifies the verification code in the URL when a user clicks on the verification email link.
     * 
     * @param  \Illuminate\Http\Request  $request
     * @param  String  $verification_code
     * 
     */
    public function verifyUser(Request $request, $verification_code) {
        $success = 0;
        $verification = VerificationCode::where('code', $verification_code)->first();
        if (isset($verification)) {
            $user = User::find($verification->user_id);
            if (isset($user)) {
                $user->email_verified_at = date("Y-m-d H:i:s");
                $user->save();
                $success = 1;
            }
        }

        return redirect('?verified=' . strval($success));
        
    }

}
