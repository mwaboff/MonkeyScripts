<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Script;
use App\User;


class SearchController extends Controller
{
    // Perform basic search
    public function search(Request $request) {
        $query = $request["query"];
        $script_results = Script::search($query)->get()->toArray();
        $user_results = User::search($query)->get()->toArray();
        return [
            "script_results" => $script_results,
            "user_results" => $user_results
        ];
    }
}
