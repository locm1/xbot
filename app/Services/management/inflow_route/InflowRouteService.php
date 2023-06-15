<?php

namespace App\Services\management\inflow_route;

use App\Models\InflowRoute;
use App\Services\common\CreateRandomStringUtility;

class InflowRouteService 
{
    public function index()
    {
        $InflowRoute = InflowRoute::with('inflowRouteUsers')->orderBy('id', 'desc')->paginate(10);
        $data = [];
        foreach ($InflowRoute->items() as $v) {
            $data[] = [
                'id' => $v->id,
                'name' => $v->name,
                'key' => $v->key,
                'count' => $v->inflowRouteUsers->whereNotNull('user_id')->count(),
            ];
        }
        return [
            'current_page' => $InflowRoute->currentPage(),
            'data' => $data,
            'per_page' => $InflowRoute->perPage(),
            'from' => $InflowRoute->firstItem(),
            'to' => $InflowRoute->lastItem(),
            'total' => $InflowRoute->total(),
            'last_page' => $InflowRoute->lastPage()
        ];
    }

    public function store($name)
    {
        $key = CreateRandomStringUtility::createRandomString(15);

        // 既存のレコードに $key が存在するかどうかチェックする
        while (InflowRoute::where('key', $key)->exists()) {
            $key = CreateRandomStringUtility::createRandomString(15);
        }

        return InflowRoute::create(['name' => $name, 'key' => $key, 'count' => 0]);
    }

    public function destroy(InflowRoute $inflow_route)
    {
        return $inflow_route->delete();
    }
}
