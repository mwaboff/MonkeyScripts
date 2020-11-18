<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;

use App;
use \League\OAuth2\Server\ResourceServer;
use \Laravel\Passport\TokenRepository;
use \Laravel\Passport\Guards\TokenGuard;
use \Laravel\Passport\ClientRepository;
use \Illuminate\Support\Facades\Auth;
use \Laravel\Passport\PassportUserProvider;
use \Laravel\Passport\PassportServiceProvider;
use \Illuminate\Http\Request;



class PassportUserVerifyController extends Controller 
{

  // Thank you to infostreams! https://gist.github.com/infostreams/1b827a688c76250e7acb7626906469a8
  public static function getUser($bearerToken) {
    $result_user = null;
    try {
      $tokenguard = new TokenGuard(
        App::make(ResourceServer::class), 
        new PassportUserProvider(Auth::createUserProvider('users'), 'users'), 
        App::make(TokenRepository::class), 
        App::make(ClientRepository::class), 
        App::make('encrypter')
      );

      dd($tokenguard);
  
      $request = Request::create('/');
      $request->headers->set('Authorization', $bearerToken);
      Auth::setRequest($request);
      $result_user = Auth::user();
    } catch (Exception $e) {
      dd($e);
    }
    
    return $result_user;
  }

  public static function authorizeUser($bearerToken) {
    $request = request();
    $request->headers->set('Authorization', 'Bearer ' . $bearerToken);
    Auth::setRequest($request);
  
    return Auth::user();
  }

}