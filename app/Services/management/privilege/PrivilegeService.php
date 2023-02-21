<?php

namespace App\Services\management\privilege;

use App\Services\management\AbstractManagementService;
use App\Models\Privilege;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class PrivilegeService extends AbstractManagementService 
{

    public function index(): Collection
    {
        return Privilege::orderBy('visits_times', 'asc')->get();
    }


    public function store($request):  Privilege
    {
        $visits_times = $request->only(['visits_times']);
        return Privilege::create($visits_times);
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
