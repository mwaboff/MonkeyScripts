<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class VerificationCode extends Model
{
    protected $fillable = [
        'user_id', 'code'
    ];

    /**
     * Override the create function so we can generate a unique verification code during creation
     * 
     * @return Illuminate\Database\Eloquent\Model
     */

    public static function create(array $attributes = []) {
        $user_id = $attributes['user_id'];
        $verification_code = base64_encode($user_id . date("D M d, Y G:i") . strval(rand(1000,9999)));
        $model = static::query()->create([
            'user_id' => $user_id, 
            'code' => $verification_code
        ]);
        return $model;
    }
}