<?php

namespace App\Services\management\reserve_history;

use App\Models\ReserveHistory;
use App\Services\management\AbstractManagementService;

class ReserveHistoryService extends AbstractManagementService 
{

    public function index() 
    {
        return ReserveHistory::with(['product.productImages', 'user'])->paginate(10);
    }


    public function store($request) 
    {
        //
    }


    public function show($reserve_history) 
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
        //
    }

}
