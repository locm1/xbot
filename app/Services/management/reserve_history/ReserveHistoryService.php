<?php

namespace App\Services\management\reserve_history;

use App\Models\ReserveHistory;
use App\Services\management\AbstractManagementService;

class ReserveHistoryService
{
    private $search_reserve_history_action;

    public function __construct(SearchReserveHistoryAction $search_reserve_history_action)
    {
        $this->search_reserve_history_action = $search_reserve_history_action;
    }

    public function index($request) 
    {
        if (isset($request)) {
            return $this->search_reserve_history_action->search($request);
        }

        return ReserveHistory::with(['product.productImages', 'user'])->all();
    }


    public function store($request) 
    {
        //
    }


    public function update($request, $reserve_history) 
    {
        $data = $request->only(['status']);
        return $reserve_history->update($data);
    }


    public function destroy($reserve_history) 
    {
        return $reserve_history->delete();
    }

}
