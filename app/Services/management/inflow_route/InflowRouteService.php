<?php

namespace App\Services\management\inflow_route;

use App\Models\InflowRoute;

class InflowRouteService 
{
    public function index()
    {
        $InflowRoute = InflowRoute::all();
        $data = [];
        foreach ($InflowRoute as $v) {
            $data[] = [
                'id' => $v->id,
                'name' => $v->name,
                'key' => $v->key,
                'count' => $v->inflowRouteUsers->count(),
            ];
        }
        return $data;
    }

    public function store($name)
    {
        $key = $this->getRandomAlphanumeric();

        // 既存のレコードに $key が存在するかどうかチェックする
        while (InflowRoute::where('key', $key)->exists()) {
            $key = $this->getRandomAlphanumeric();
        }

        return InflowRoute::create(['name' => $name, 'key' => $key, 'count' => 0]);
    }

    private function getRandomAlphanumeric()
    {
        $str = '1234567890abcdefghijklmnopqrstuvwxyz';
        return substr(str_shuffle($str), 0, 15);
    }
}
