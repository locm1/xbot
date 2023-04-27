<?php

namespace App\Http\Controllers\api\management;

use App\Http\Controllers\Controller;
use App\Models\SegmentTemplate;
use Illuminate\Http\Request;

class SegmentTemplateController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return ['segmentTemplate' => SegmentTemplate::all()];
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->only(['name', 'search_terms_json']);
        return ['segmentTemplate' => SegmentTemplate::create($data)];
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
    public function update(Request $request, SegmentTemplate $SegmentTemplate)
    {
        $data = $request->only(['search_terms_json']);
        $SegmentTemplate->update($data);
        return ['segmentTemplate' => SegmentTemplate::all()];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(SegmentTemplate $SegmentTemplate)
    {
        return ['segmentTemplate' => $SegmentTemplate->delete()];
    }
}
