<?php

namespace App\Http\Controllers\api\management\invitation;

use App\Http\Controllers\Controller;
use App\Models\Invitation;
use App\Services\management\invitation\InvitationService;
use App\Http\Requests\management\invitation\UpdateInvitationRequest;
use Illuminate\Http\Request;

class InvitationController extends Controller
{

    private $invitation_service;

    public function __construct(InvitationService $invitation_service) {
        $this->invitation_service = $invitation_service;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $invitations = $this->invitation_service->index();
        return response()->json(['invitations' => $invitations], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Invitation $invitation)
    {
        $invitation = $this->invitation_service->show($invitation);
        return response()->json(['invitation' => $invitation], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateInvitationRequest  $request
     * @param  Invitation  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateInvitationRequest $request, Invitation $invitation)
    {
        $invitation = $this->invitation_service->update($request, $invitation);
        return response()->json(['invitation' => $invitation], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
