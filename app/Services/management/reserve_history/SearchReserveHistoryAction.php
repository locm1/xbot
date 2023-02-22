<?php

namespace App\Services\management\reserve_history;

use App\Models\ReserveHistory;
use App\Services\common\SearchUtility;

class SearchReserveHistoryAction
{
    public function search($request)
    {
        $query = ReserveHistory::query();

        if ($request->user_name) {
            $this->searchByName($query, $request->user_name);
        }

        if ($request->product_name) {
            $this->searchByProductName($query, $request->product_name);
        }

        if ($request->status) {
            $this->searchByStatus($query, $request->status);
        }

        return $query->with(['product.productImages', 'user'])->paginate(10);
    }

    private function searchByStatus($query, $status)
    {
        return $query->where('status', $status);
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

    private function searchByProductName($query, $product_name)
    {
        $query->whereIn('product_id', function ($query) use ($product_name) {
            $query->from('products')
                ->select('id')
                ->where('name', 'like', "{$product_name}%");
        });
        return $query;
    }
}