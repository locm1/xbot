<?php

namespace App\Http\Controllers\api\liff\privileges;

use App\Http\Controllers\Controller;
use App\Models\Privilege;
use Illuminate\Http\Request;

class PrivilegeController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $data = [];
        $Privileges = Privilege::with('privilegeItems')->get();
        foreach ($Privileges as $privilege) {
            $items = [];
            if ($privilege->privilegeItems ?? false){
                foreach ($privilege->privilegeItems as $item) {
                    $items[] = [
                        'id' => $item->id,
                        'name' => $item->name
                    ];
                }
            }
            $data[] = [
                'id' => $privilege->id,
                'visits_times' => $privilege->visits_times,
                'items' => $items
            ];
        }

        return $data;
    }
}
