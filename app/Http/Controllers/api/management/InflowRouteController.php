<?php

namespace App\Http\Controllers\api\management;

use App\Http\Controllers\Controller;
use App\Models\InflowRoute;
use App\Services\management\inflow_route\InflowRouteService;
use Illuminate\Http\Request;

class InflowRouteController extends Controller
{
    private $service;

    public function __construct(InflowRouteService $service) {
        $this->service = $service;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(['inflow_routes' => $this->service->index()], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $this->service->store($request->name);
        return response()->json($data, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  InflowRoute  $inflow_route
     * @return \Illuminate\Http\Response
     */
    public function destroy(InflowRoute $inflow_route)
    {
        $this->service->destroy($inflow_route);
        return response()->json([], 204);
    }
}
