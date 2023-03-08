<?php

namespace App\Services\management\api_key;

use App\Services\management\AbstractManagementService;

class SaveApiKeyAction
{
    public function saveApiKey($env_path, $target_api_key, $save_api_key) 
    {
        file_put_contents($env_path, str_replace(
            "$target_api_key=" .config("api_key.$target_api_key"),
            "$target_api_key=" .$save_api_key,
            file_get_contents($env_path)
        ));
    }
}
