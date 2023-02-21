<?php

namespace App\Services\management\visitor_history;

use App\Models\VisitorHistory;
use App\Services\management\AbstractManagementService;
use Illuminate\Database\Eloquent\Model;

class VisitorHistoryService
{

    public function index() 
    {
        return VisitorHistory::with('user')->paginate(10);
    }


    public function store($request) 
    {
        //
    }


    public function show(VisitorHistory $visitor_history) 
    {
        return $visitor_history;
    }


    public function update($request, VisitorHistory $visitor_history) 
    {
        $data = $request->only(['created_at', 'memo']);
        return $visitor_history->update($data);
    }


    public function destroy(VisitorHistory $visitor_history) 
    {
        return $visitor_history->delete();
    }

}
