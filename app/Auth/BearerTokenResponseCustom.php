<?php

namespace App\Auth;

use League\OAuth2\Server\Entities\AccessTokenEntityInterface;
use App\User;

class BearerTokenResponseCustom extends \League\OAuth2\Server\ResponseTypes\BearerTokenResponse
{
    /**
     * Add custom fields to your Bearer Token response here, then override
     * AuthorizationServer::getResponseType() to pull in your version of
     * this class rather than the default.
     * 
     * Thank you https://stackoverflow.com/a/54032911 !!!!
     *
     * @param AccessTokenEntityInterface $accessToken
     *
     * @return array
     */
    protected function getExtraParams(AccessTokenEntityInterface $accessToken): array
    {
        $user_id = $this->accessToken->getUserIdentifier();
        $user = User::find($user_id);
        $user_name = $user->name;
        $user_email = $user->email;
        return [
            'user_id' => $user_id,
            'user_name' => $user_name
        ];
    }
}
