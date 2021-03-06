<?php

namespace App\Http\Controllers;

use App;
use \Laravel\Passport\PassportUserProvider;
use \League\OAuth2\Server\ResourceServer;
use \Laravel\Passport\TokenRepository;
use \Laravel\Passport\Guards\TokenGuard;
use \Laravel\Passport\ClientRepository;
use \Illuminate\Support\Facades\Auth;
use \Illuminate\Http\Request;

class PassportUserVerifyController {

  static function getUser($bearerToken) {
    $result_user = null;
    try {
      $tokenguard = new TokenGuard(
        App::make(ResourceServer::class), 
        new PassportUserProvider(Auth::createUserProvider('users'), 'users'), 
        App::make(TokenRepository::class), 
        App::make(ClientRepository::class), 
        App::make('encrypter')
      );
      $request = Request::create('/');
      $request->headers->set('Authorization', $bearerToken);
      $result_user = $tokenguard->user($request);
    } catch (Exception $e) {
      // dd($e);
    }

    return $result_user;
  }
  
  static function authorizeUser($bearerToken) {
    $request = request();
    $request->headers->set('Authorization', $bearerToken);
    Auth::setRequest($request);
  
    return Auth::user();
  }
  
}