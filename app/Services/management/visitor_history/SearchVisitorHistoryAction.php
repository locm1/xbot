<?php

namespace App\Services\management\visitor_history;

use App\Models\VisitorHistory;
use App\Services\common\SearchUtility;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\Eloquent\Model;

class SearchVisitorHistoryAction
{
    public function search($request)
    {
        $query = VisitorHistory::query();

        if ($request->name) {
            $this->searchByName($query, $request->name);
        }

        if ($request->start_created_at) {
            $query->where('created_at', '>', $request->start_created_at);
        }
        
        if ($request->end_created_at) {
            $query->where('created_at', '<', "$request->end_created_at 23:59:59");
        }

        return $query->with('user')->paginate(10);
    }

    private function searchByName($query, $name)
    {
        $replace_name = str_replace(array(' ', '　'), '', $name);

        $query->whereIn('user_id', function ($query) use ($replace_name) {
            $query->from('users')
                ->select('id');
                SearchUtility::searchByName($query, $replace_name);
        });
        return $query;
    }
}