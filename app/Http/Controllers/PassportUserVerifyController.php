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
use \Illuminate\Http\Request;


class PassportUserVerifyController extends Controller 
{

  // Thank you to infostreams! https://gist.github.com/mwaboff/4f8c1d9b3708ecac53e4aa024eab8bcb
  public static function getUser($bearerToken) {
    $result_user = 'not';
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