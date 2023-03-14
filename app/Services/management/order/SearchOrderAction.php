<?php

namespace App\Services\management\order;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;
use App\Models\OrderHistory;
use App\Services\common\SearchUtility;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\Eloquent\Model;

class SearchOrderAction
{
    public function search($request)
    {
        $query = OrderHistory::query();

        if ($request->name) {
            $this->searchByName($query, $request->name);
        }

        if ($request->status) {
            $this->searchByStatus($query, $request->status);
        }

        if ($request->id) {
            $this->searchById($query, $request->id);
        }

        if ($request->prefecture) {
            $this->searchByPrefecture($query, $request->prefecture);
        }

        return $query->with(['OrderDestination', 'user'])->paginate(10);
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

    private function searchByStatus($query, $status)
    {
        $query->where('status', $status);
        return $query;
    }

    private function searchById($query, $id)
    {
        $query->where('id', $id);
        return $query;
    }

    private function searchByPrefecture($query, $prefecture)
    {

        $query->whereIn('order_user_id', function ($query) use ($prefecture) {
            $query->from('order_users')
                ->select('id')
                ->where('prefecture', $prefecture);
        });
        return $query;
    }
}