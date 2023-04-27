<?php

namespace App\Services\management\privilege;

use App\Services\management\AbstractManagementService;
use App\Models\Privilege;
use App\Models\PrivilegeItem;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class PrivilegeService extends AbstractManagementService 
{

    public function index(): Collection
    {
        return Privilege::orderBy('visits_times', 'asc')->get();
    }


    public function store($request): Privilege
    {
        $Privilege = Privilege::create(['visits_times' => $request->time]);
        $now = now()->format('Y-m-d H:i:s');
        $data = [];
        foreach ($request->privileges as $k => $v) {
            if (!$v) continue;
            $data[] = [
                'privilege_id' => $Privilege->id,
                'name' => $v,
                'created_at' => $now,
                'updated_at' => $now
            ];
        }
        PrivilegeItem::insert($data);

        return $Privilege;
    }


    /**
     * Display the specified resource.
     *
     * @param  Privilege $privilege
     * @return Privilege
     */
    public function show($privilege): Privilege
    {
        return $privilege;
    }


    public function update($request, Model $privilege): array
    {
        $visits_times = $request->only(['visits_times']);
        $privilege->update($visits_times);
        return $visits_times;
    }


    public function destroy(Model $privilege) 
    {
        return $privilege->delete();
    }

}
