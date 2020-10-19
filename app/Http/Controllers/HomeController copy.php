<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Script;
use App\User;

class HomeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $scripts = Script::all();
        $users = User::all();
        return view('home', compact('scripts','users'));
    }

}
