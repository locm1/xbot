<?php

namespace App\Services\management\user;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\Eloquent\Model;

class SearchUserAction
{
    public function search($request)
    {
        $query = User::query();

        if ($request->name) {
            $replace_name = str_replace(array(' ', '　'), '', $request->name);
            $this->searchByName($query, $replace_name);
        }

        if ($request->tel) {
            $this->searchByTel($query, $request->tel);
        }
        return $query->paginate(10);
    }


    private function searchByName($query, $name)
    {
        $query->where(DB::raw('CONCAT(last_name, first_name)'), 'like', "{$name}%")
            ->orWhere(DB::raw('CONCAT(last_name_kana, first_name_kana)'), 'like', "{$name}%");
        return $query;
    }
    

    private function searchByTel($query, $tel)
    {
        $query->where('tel', 'like', "{$tel}%");
        return $query;
    }
}