<?php

namespace App\Http\Controllers\api\management;

use App\Http\Controllers\Controller;
use App\Http\Requests\management\report\ReportRequest;
use App\Models\Report;
use Illuminate\Http\Request;
use App\Services\management\report\ReportService;

class ReportController extends Controller
{
    private $service;

    public function __construct(ReportService $service) {
        $this->service = $service;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return $this->service->index();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ReportRequest $request)
    {
        return $this->service->store($request);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Report $Report)
    {
        return $this->service->show($Report);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(ReportRequest $request, Report $Report)
    {
        return $this->service->update($request, $Report);
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

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getUserByDate(Request $request)
    {
        $users = $this->service->getUserByDate($request);
        return response()->json($users, 200);
    }


    public function getUserByMonth()
    {
        $users = $this->service->getUserByMonth();
        return response()->json($users, 200);
    }

    public function getTopSellingProductsFromLastMonth()
    {
        $order_products = $this->service->getTopSellingProductsFromLastMonth();
        return response()->json(['order_products' => $order_products], 200);
    }
}
