<?php

namespace App\Services\management\privilege;

use App\Services\management\AbstractManagementService;
use App\Models\Privilege;
use App\Models\PrivilegeItem;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class PrivilegeItemService
{
    public function index(Privilege $privilege): Collection
    {
        return PrivilegeItem::where('privilege_id', $privilege->id)->get();
    }

    public function store($request, Privilege $privilege)
    {
        $data = [
            'privilege_id' => $privilege->id,
            'name' => $request->name
        ];
        return PrivilegeItem::create($data);
    }


    public function update($request, Privilege $privilege, PrivilegeItem $item)
    {
        $data = [
            'privilege_id' => $privilege->id,
            'name' => $request->name
        ];
        return $item->update($data);
    }


    public function destroy(PrivilegeItem $item) 
    {
        return $item->delete();
    }

}
