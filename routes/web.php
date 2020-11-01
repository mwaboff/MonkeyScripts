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




// Route::resource('/scripts', 'ScriptsController');


// Route::get('/about', function () {
//     return "About Page";
//     // return view('about');
// });

// Route::get('/privacy', function () {
//     return "Privacy Page";
//     // return view('privacy');
// });

// Route::get('/tos', function () {
//     return "T.o.S. Page";
//     // return view('tos');
// });

// Route::get('/admin', function () {
//     return "Admin Page";
//     // return view('admin');
// });

// Auth::routes();

Route::get('/{path?}', 'HomeController@index')->name('home');

// Route::get('/script/create', 'ScriptsController@create')->name('script_create');

// Route::get('/script/{id}', 'ScriptsController@show')->name('script_show');

// Route::get('/privacy', function() {
//     return view('static_pages/privacy');
// });

