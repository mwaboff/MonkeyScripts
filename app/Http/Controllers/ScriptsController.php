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
        $response = [
            "id" => $script["id"],
            "title" => $script["title"],
            "author_id" => $script["author_id"],
            "description" => $script["description"],
            "code" => $script["code"]
        ];

        return json_encode($response);
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

    public function create(Request $request)
    {
        $user_id = auth("api")->user()->id;
        $new_script = Script::create([
            'author_id' => $user_id,
            'title' => $request['title'],
            'description' => $request['description'],
            'code' => $request['code'],
        ]);
        return json_encode($new_script);
    }

    public static function recommend(Request $request)
    {
        if (!static::validateRecommendRequestInput($request)) {
            return "Invalid Input";
        }

        switch ($request->type) {
            case 'recent':
                $result = self::getRecent($request->count);
                break;
            case 'toprated':
                $result = self::getTopRated($request->count);
                break;
            case 'topdownload':
                $result = self::getTopDownloads($request->count);
                break;
            case 'choice':
                $result = self::getEditorsChoice($request->count);
                break;
        }

        return $result;
    }

    private static function validateRecommendRequestInput(Request $request) {
        return $request->type && $request->count && $request->count < 15;
    }

    // public static function getRecommended($limit = 10)
    // {
    //     $results = [
    //         'Recently Updated' => self::getRecentScripts($limit),
    //         'Top Downloads' => self::getTopDownloadedScripts($limit),
    //         'Editor\'s Choice' => self::getEditorsChoiceScripts($limit),
    //         'Top Rated' => self::getTopRatedScripts($limit)
    //     ];

    //     return $results;
    // }

    private static function getRecent($limit = 10)
    {
        return DB::table('scripts')->orderBy('updated_at', 'desc')->take($limit)->get()->toArray();
    }

    private static function getTopRated($limit = 10)
    {
        return DB::table('scripts')->take($limit)->get()->toArray();
    }

    private static function getTopDownloads($limit = 10)
    {
        return DB::table('scripts')->take($limit)->get()->toArray();
    }

    private static function getEditorsChoice($limit = 10) 
    {
        return DB::table('scripts')->take($limit)->get()->toArray();
    }
}
