<?php

namespace App\Http\Controllers\api\liff\product;

use App\Http\Controllers\Controller;
use App\Models\ProductCategory;
use Illuminate\Http\Request;

class GetCategoriesController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @return \Illuminate\Http\Response
     */
    public function __invoke()
    {
        $categories = ProductCategory::where('is_undisclosed', 0)->orderBy('display_order')->get();
        return ['categories' => $categories];
    }
}
