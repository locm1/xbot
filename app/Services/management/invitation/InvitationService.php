<?php

namespace App\Services\management\invitation;

use App\Models\Invitation;
use App\Services\management\AbstractManagementService;

class InvitationService
{

    public function index() 
    {
        return Invitation::with('coupon')->paginate(20);
    }


    public function store() 
    {
        //
    }


    public function show(Invitation $invitation) 
    {
        return $invitation;
    }


    public function update($request, Invitation $invitation) 
    {
        $data = $request->only(['coupon_id', 'privilege_detail']);
        return $invitation->update($data);
    }


    public function destroy(Invitation $invitation) 
    {
        $invitation->delete();
    }

}
