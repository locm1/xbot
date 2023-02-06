<?php

namespace App\Services\management\user;

use Illuminate\Database\Eloquent\Collection;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class SearchUserAction
{
    public function search($request)
    {
        $query = User::query();

        if ($request->name) {
            $query->where('first_name', 'like', "%{$request->name}%")
                ->orWhere('last_name', 'like', "%{$request->name}%")
                ->orWhere('first_name_kana', 'like', "%{$request->name}%")
                ->orWhere('last_name_kana', 'like', "%{$request->name}%");
        }

        if ($request->tel) {
            $query->where('tel', $request->tel);
        }
        return $query->get();
    }
}