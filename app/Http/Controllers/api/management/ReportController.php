<?php

namespace App\Http\Controllers\api\management;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\management\report\ReportService;

class ReportController extends Controller
{
    private $report_service;

    public function __construct(ReportService $report_service) {
        $this->report_service = $report_service;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getUserByDate(Request $request)
    {
        $users = $this->report_service->getUserByDate($request);
        return response()->json($users, 200);
    }


    public function getUserByMonth()
    {
        $users = $this->report_service->getUserByMonth();
        return response()->json($users, 200);
    }
}
