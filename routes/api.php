<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Laravel\Passport\Http\Controllers\AccessTokenController;
use App\Http\Middleware\ApiLogin;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ScriptsController;
// use \Laravel\Passport\Http\Controllers\AccessTokenController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::get('script/recommend', 'ScriptsController@recommend');

Route::post('script/new', [ScriptsController::class, 'create'])->middleware(['auth:api'])->name('create-script');
Route::get('script/show', [ScriptsController::class, 'show'])->name('show-script');

Route::post('login', [AccessTokenController::class, 'issueToken'])->middleware(['api-login', 'throttle'])->name('login');

Route::post('whoami', [UserController::class, 'whoIs'])->name('whoami');
Route::post('register', [UserController::class, 'create'])->name('register');