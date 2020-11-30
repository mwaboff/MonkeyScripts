<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\PassportUserVerifyController;
use App\Script;
use App\SimilarScript;
use App\User;
use App\Interaction;

class ScriptsController extends Controller
{
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request) {

        // dd($request);
        $id = $request["id"];
        $script = Script::findOrFail($id);
        $author = User::findOrFail($script["author_id"]);

        $response = [
            "id" => $script["id"],
            "title" => $script["title"],
            "author_id" => $script["author_id"],
            "author_name" => $author["name"],
            "summary" => $script["summary"],
            "description" => $script["description"],
            "created_day" => $script->getCreatedDay(),
            "updated_day" => $script->getUpdatedDay(),
            "downloads" => $script->getDownloadCount(),
            "code" => $script["code"]
        ];

        InteractionController::processInteraction($request, $script["id"], ['visited'=>true, 'downloaded'=>false]);
        
        return json_encode($response);
    }

    public function clickedInstall(Request $request, $script_id) {
        InteractionController::processInteraction($request, $script_id, ['visited'=>false, 'downloaded'=>true]);

        return json_encode(["message"=>"success"]);
    }

    public function install(Request $request, $script_id) {
        $script = Script::findOrFail($script_id);
        return $script["code"];
        
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request) {
        //
        $user_id = auth("api")->user()->id;
        if (!$user_id) return json_encode(['success'=>false, 'message'=>'Invalid User']);

        $script = Script::find($request["script_id"]);

        if (!$script) return json_encode(['success'=>false, 'message'=>'Unable to locate script']);

        $script->title = $request["title"];
        $script->description = $request["description"];
        $script->summary = $request["summary"];
        $script->code = $request["code"];
        $script->save();

        return json_encode(['success'=>true, 'message'=>'', 'script_id'=>$script->id]);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request) {
        //
        $user_id = auth("api")->user()->id;
        $script = Script::findOrFail($request["script_id"]);
        $script->delete();

        return "{message: success}";
    }

    public function create(Request $request) {
        $user_id = auth("api")->user()->id;

        if (!$user_id) return json_encode(['success'=>false, 'message'=>'Invalid User']);


        $new_script = Script::create([
            'author_id' => $user_id,
            'title' => $request['title'],
            'description' => $request['description'],
            'summary' => $request['summary'],
            'code' => $request['code'],
        ]);

        if ($new_script) {
            $result = [
                "success" => true,
                "message" => '',
                "script_id" => $new_script->id
            ];
        } else {
            $result = [
                "success" => false,
                "message" => 'Unable to create script'
            ];
        }
        
        return $result;
    }

    public static function recommend(Request $request) {
        // dd(static::getSimilarScripts(1));
        // dd(static::getTopDownloadedScripts());
        if (!static::validateRecommendRequestInput($request)) return "Invalid Input";

        switch ($request->type) {
            case 'recent':
                $result = self::getRecent($request->count);
                break;
            case 'recommended':
                $result = self::getRecommended($request, $request->count);
                break;
            case 'topdownload':
                $result = self::getTopDownloads($request->count);
                break;
            case 'official':
                $result = self::getOfficiallyDevelopedScripts($request->count);
                break;
            case 'similar':
                $result = self::getSimilar($request->scriptid, $request->count);
                break;
        }

        return $result;
    }

    private static function validateRecommendRequestInput(Request $request) {
        return $request->type && $request->count && $request->count < 15;
    }

    private static function getRecent($limit = 10) {
        $recent_scripts = Script::orderBy('updated_at', 'desc')->take($limit)->get()->all();
        return static::removeCodeFromScriptResults($recent_scripts);
    }

    private static function getRecommended($request, $limit = 10) {
        $recommended_scripts = static::getRecommendedScripts($request, $limit);
        return static::removeCodeFromScriptResults($recommended_scripts);
    }

    private static function getTopDownloads($limit = 10) {
        $top_downloads = static::getTopDownloadedScripts();
        return array_slice(static::removeCodeFromScriptResults($top_downloads), 0, $limit);
    }

    private static function getOfficiallyDevelopedScripts($limit = 10) {
        $official_scripts = Script::where('author_id', 1)->orWhere('author_id', 2)->orWhere('author_id', 3)->get()->all();
        $script_list = static::removeCodeFromScriptResults($official_scripts);
        shuffle($script_list); // Add some variety and randomness
        return array_slice($script_list, 0, $limit); // Return only the right number of results

    }

    private static function getSimilar($scriptid, $limit = 10) {
        $results = array_slice(static::getSimilarScripts($scriptid), 0, $limit);
        return static::removeCodeFromScriptResults($results);
    }

    private static function getEditorsChoice($limit = 10) {
        $script_list = Script::select('id', 'title', 'author_id', 'description')->take($limit)->get()->toArray();

        shuffle($script_list); // Add some variety and randomness
        return array_slice($script_list, 0, $limit); // Return only the right number of results

    }

    public static function getScriptsByUser($uid) {
        return Script::select('id', 'title', 'author_id', 'summary')->where('author_id', $uid)->get()->toArray();
    }


    public static function getRecommendedScripts($request, $limit = 10) {
        $visitor = UserController::currentLoggedInUser($request);

        $script_list = isset($visitor) ? static::getRecommendedScriptsForUser($visitor, $limit) : static::getRecommendedScriptsForGeneric($limit);
        $script_list = array_unique($script_list);

        shuffle($script_list); // Add some variety and randomness
        return array_slice($script_list, 0, $limit); // Return only the right number of results
    }

    private static function removeCodeFromScriptResults($script_list) {
        $result = [];
        // $script_list = array_unique($script_list);
        foreach ($script_list as $script) {
            $result[] = [
                'id' => $script->id,
                'title' => $script->title,
                'summary' => $script->summary,
                'description' => $script->description,
                'downloads' => $script->getDownloadCount()
            ];
        }

        return $result;
    }

    private static function getRecommendedScriptsForUser($user, $limit=10) {
        // First let's get all of the user's interactions, sorted by most recently the interaction changed.
        $user_interactions = array_slice($user->getInteractedScripts(), 0, $limit);

        $recommended_scripts = static::getSimilarScriptsFromList($user_interactions, 2);

        if (count($recommended_scripts) < $limit) $recommended_scripts = static::getRecommendedScriptsForGeneric($limit);
        return $recommended_scripts;
    }

    private static function getRecommendedScriptsForGeneric($limit=10) {
        $top_scripts = array_slice(static::getTopDownloadedScripts(), 0, 10);
        return static::getSimilarScriptsFromList($top_scripts, $limit);
    }

    private static function getSimilarScriptsFromList($script_list, $limit=10) {
        $result = [];
        foreach ($script_list as $script) {
            $similar_scripts = static::getSimilarScripts($script->id);
            $result = array_merge($result, $similar_scripts);
        }

        return $result;
    }


    private static function getTopDownloadedScripts() {
        $results = [];
        $query = "SELECT script_id, SUM(downloaded) AS 'downloads' FROM monkeyscripts.interactions GROUP BY script_id ORDER BY downloads DESC";
        $sorted_interactions = DB::select($query);

        foreach ($sorted_interactions as $interaction) {
            $script = Script::find($interaction->script_id);
            isset($script) ? ($results[] = $script) : null;
        }

        return $results;
    }



    private static function getSimilarScripts($script_id, $column_name="combined_score") {
        $results = [];
        $similar_ids = DB::table('monkeyscripts.similar_scripts')
            ->where('elem1_id', $script_id)
            ->orderBy($column_name, 'DESC')
            ->pluck('elem2_id');

        foreach ($similar_ids as $similar_id) {
            $script = Script::find($similar_id);
            isset($script) ? ($results[] = $script) : null;
        }

        return $results;
    }
}
