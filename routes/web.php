<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/script/{script_id}.user.js', 'ScriptsController@install')->name('install');
Route::get('/{path?}', 'HomeController@index')->name('home');
Route::any('/{any}/{all?}', 'HomeController@index')->name('home2');
Route::any('/{any}/{some}/{all?}', 'HomeController@index')->name('home3');
