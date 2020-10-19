<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\Script;

class ScriptsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return "You have arrived at the page for script main page";
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
        return view('scripts.script_create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $script = Script::findOrFail($id);
        return view('scripts/script_view', compact('script')); // can chain with compact('id', 'name', 'password',...)
        // return view('scripts/script_view')->with('id', $id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public static function getRecommendedScripts($limit = 10)
    {
        $results = [
            'Recently Updated' => self::getRecentScripts($limit),
            'Top Downloads' => self::getTopDownloadedScripts($limit),
            'Editor\'s Choice' => self::getEditorsChoiceScripts($limit),
            'Top Rated' => self::getTopRatedScripts($limit)
        ];

        return $results;
    }

    private static function getRecentScripts($limit = 10)
    {
        return DB::table('scripts')->orderBy('updated_at', 'desc')->take($limit)->get()->toArray();
    }

    private static function getTopDownloadedScripts($limit = 10)
    {
        return DB::table('scripts')->take($limit)->get()->toArray();
    }

    private static function getEditorsChoiceScripts($limit = 10) 
    {
        return DB::table('scripts')->take($limit)->get()->toArray();
    }

    private static function getTopRatedScripts($limit = 10)
    {
        return DB::table('scripts')->take($limit)->get()->toArray();
    }

    
}
