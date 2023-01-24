<?php

namespace App\Http\Controllers\api\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TermsOfService;
use App\Http\Requests\TermsOfServiceRequest;
use App\Services\setting\TermsOfServiceService;

class TermsOfServiceController extends Controller
{
    private $terms_of_service_service;

    public function __construct(TermsOfServiceService $terms_of_service_service) {
        $this->terms_of_service_service = $terms_of_service_service;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $term = $this->terms_of_service_service->getAllTermsOfServices();
        return response()->json(['term' => $term], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(TermsOfServiceRequest $request)
    {
        $term = $this->terms_of_service_service->createTermsOfService($request->content);
        return response()->json(['term' => $term], 201);
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
    public function update(Request $request)
    {
        //
        $update = [
            'content' => $request->content,
        ];
        $policy = TermsOfService::where('id', $request->id)->update($update);
        $policy = TermsOfService::all();
        if ($policy) {
            return response()->json(
                $policy
            , 200);
        }
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
}
