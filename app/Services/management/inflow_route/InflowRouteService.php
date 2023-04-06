<?php

namespace App\Services\management\inflow_route;

use App\Models\InflowRoute;

class InflowRouteService 
{
    public function index()
    {
        return InflowRoute::all();
    }
}
