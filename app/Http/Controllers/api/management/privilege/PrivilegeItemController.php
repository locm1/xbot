<?php

namespace App\Http\Controllers\api\management\privilege;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\management\privilege\PrivilegeItemService;
use App\Http\Requests\management\privilege\StorePrivilegeItemRequest;
use App\Http\Requests\management\privilege\UpdatePrivilegeItemRequest;
use App\Models\Privilege;
use App\Models\PrivilegeItem;

class PrivilegeItemController extends Controller
{
    private $privilege_item_service;

    public function __construct(PrivilegeItemService $privilege_item_service) {
        $this->privilege_item_service = $privilege_item_service;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Privilege $privilege)
    {
        $privilege_items = $this->privilege_item_service->index($privilege);
        return response()->json(['privilegeItems' => $privilege_items], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StorePrivilegeItemRequest $request, Privilege $privilege)
    {
        $privilege_item = $this->privilege_item_service->store($request, $privilege);
        return response()->json(['privilegeItem' => $privilege_item], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  Privilege  $privilege
     * @return \Illuminate\Http\Response
     */
    public function update(UpdatePrivilegeItemRequest $request, Privilege $privilege, PrivilegeItem $item)
    {
        $privilege = $this->privilege_item_service->update($request, $privilege, $item);
        return response()->json(['privilege' => $privilege], 200);
    }

    /**
     * Remove the specified resource from storage.
     * 
     * @param Privilege $privilege
     * @param  PrivilegeItem  $item
     * @return \Illuminate\Http\Response
     */
    public function destroy(Privilege $privilege, PrivilegeItem $item)
    {
        $this->privilege_item_service->destroy($item);
        return response()->json([], 204);
    }
}
