<?php

namespace App\Services\management\user;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Services\common\SearchUtility;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\Eloquent\Model;

class SearchUserAction
{
    public function search($request)
    {
        $query = User::query();

        if ($request->name) {
            $replace_name = str_replace(array(' ', '　'), '', $request->name);
            SearchUtility::searchByName($query, $replace_name);
        }

        if ($request->tel) {
            $this->searchByTel($query, $request->tel);
        }
        return $query->get();
    }
    

    private function searchByTel($query, $tel)
    {
        $query->where('tel', 'like', "{$tel}%");
        return $query;
    }
}