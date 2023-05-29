<?php

namespace App\Services\management\specific_trade;

use Illuminate\Database\Eloquent\Collection;
use App\Models\SpecificTrade;
use App\Services\management\AbstractManagementService;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class SpecificTradeService
{

    public function index() :Collection
    {
        return SpecificTrade::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     */
    public function store($request)
    {
        $upsert_specific_trades = array();

        foreach ($request->specific_trades as $specific_trade) {
            $upsert_specific_trades[] = [
                'id' => $specific_trade['id'] ?? null,
                'title' => $specific_trade['title'],
                'content' => $specific_trade['content'],
            ];
        }

        return DB::transaction(function () use ($upsert_specific_trades, $request) {
            SpecificTrade::upsert($upsert_specific_trades, ['id']);

            # 削除対象IDの配列が送られていたら（空じゃないとき）
            if (!empty($request->delete_specific_trade_ids)) {
                $this->destroy($request->delete_specific_trade_ids);
            }
        });

        return $upsert_specific_trades;
    }

    private function destroy($delete_specific_trade_ids) 
    {
        return SpecificTrade::whereIn('id', $delete_specific_trade_ids)->delete();
    }

}

