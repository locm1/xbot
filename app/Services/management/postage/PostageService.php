<?php

namespace App\Services\management\postage;

use Illuminate\Database\Eloquent\Collection;
use App\Models\Postage;
use App\Models\Prefecture;
use App\Services\management\AbstractManagementService;
use App\Services\management\ec_configuration\EcommerceConfigurationService;
use GuzzleHttp\Psr7\Request;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class PostageService
{
    private $service;

    public function __construct(EcommerceConfigurationService $service)
    {
        $this->service = $service;
    }

    public function index($request) :Collection
    {
        if ($request->name) {
            $prefecture = Prefecture::where('name', $request->name)->first();
            return Postage::where('prefecture_id', $prefecture->id)->get();
        }
        return Postage::with('prefecture')->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     */
    public function upsert($request) :array
    {
        return DB::transaction(function () use ($request) {

            # リクエストに環境設定のIDが含まれているか
            if (isset($request->ecommerce_configuration_id)) {
                $this->service->update($request, $request->ecommerce_configuration_id);
            } else {
                $this->service->store($request);
            }

            $postages = $request->postages;
            Postage::upsert($postages, ['id'], ['postage', 'prefecture_id']);
            return $postages;
        });
    }
}
