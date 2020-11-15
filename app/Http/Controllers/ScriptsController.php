<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\Script;
use App\User;

class ScriptsController extends Controller
{
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        $id = $request["id"];
        $script = Script::findOrFail($id);
        $author = User::findOrFail($script["author_id"]);
        $response = [
            "id" => $script["id"],
            "title" => $script["title"],
            "author_id" => $script["author_id"],
            "author_name" => $author["name"],
            "description" => $script["description"],
            "code" => $script["code"]
        ];

        return json_encode($response);
    }

    public function install($script_id)
    {
        $script = Script::findOrFail($script_id);
        return $script["code"];
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request)
    {
        //
        $user_id = auth("api")->user()->id;
        $script = Script::findOrFail($request["script_id"]);
        $script->title = $request["title"];
        $script->description = $request["description"];
        $script->code = $request["code"];
        $script->save();

        return "{message: success}";

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        //
        $user_id = auth("api")->user()->id;
        $script = Script::findOrFail($request["script_id"]);
        $script->delete();

        return "{message: success}";
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
        return Script::select('id', 'title', 'author_id', 'description')->orderBy('updated_at', 'desc')->take($limit)->get()->toArray();
    }

    private static function getTopRated($limit = 10)
    {
        return Script::select('id', 'title', 'author_id', 'description')->take($limit)->get()->toArray();
    }

    private static function getTopDownloads($limit = 10)
    {
        return Script::select('id', 'title', 'author_id', 'description')->take($limit)->get()->toArray();
    }

    private static function getEditorsChoice($limit = 10) 
    {
        return Script::select('id', 'title', 'author_id', 'description')->take($limit)->get()->toArray();
    }

    public static function getScriptsByUser($uid, $limit) {
        return Script::select('id', 'title', 'author_id', 'description')->where('author_id', $uid)->take($limit)->get()->toArray();
    }
}
