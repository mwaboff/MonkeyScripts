<?php

namespace App\Http\Middleware;

use Illuminate\Support\Facades\DB;

use App\User;

use Closure;

class ApiLogin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {

        
        $secret = DB::table('oauth_clients')->where('id', 1)->pluck('secret')->first();

        $request->merge([
            'grant_type' => 'password',
            'client_id' => 1,
            'client_secret' => $secret
        ]);

        // Check to make sure user's email is verified

        $user = User::where('email', $request['username'])->first();
        if(isset($user)) {
            if (isset($user->email_verified_at)) {
                return $next($request);
            } else {
                dd(json_encode([
                    'success' => false,
                    'message' => 'Email needs to be verified before logging in.'
                ]));
            }
        }

        dd(json_encode([
            'success' => false,
            'message' => 'Account not found.'
        ]));
        
    }
}
