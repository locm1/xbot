<?php

namespace App\Http\Controllers\api\management;

use App\Http\Controllers\Controller;
use App\Http\Requests\management\page\UpdatePageRequest;
use App\Services\management\page\PageService;
use Illuminate\Http\Request;

class PageController extends Controller
{
    private $page_service;

    public function __construct(PageService $page_service)
    {
        $this->page_service = $page_service;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $pages = $this->page_service->index();
        return response()->json(['pages' => $pages], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  UpdatePageRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function update(UpdatePageRequest $request)
    {
        $pages = $this->page_service->update($request);
        return response()->json(['pages' => $pages], 200);
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
