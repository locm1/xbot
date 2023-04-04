<?php

namespace App\Services\liff\cart;

use App\Models\Cart;
use App\Models\Product;
use App\Models\User;
use App\Services\api\line\verify\VerifyService;
use App\Services\common\MergeArrayUtility;
use App\Services\liff\user\UserService;
use App\Services\management\product\SearchProductAction;
use Illuminate\Support\Facades\Log;

class DeleteCartService
{
    public function deleteCartByProductIds($user, $product_ids) 
    {
        return Cart::where('user_id', $user->id)->whereIn('product_id', $product_ids)->delete();
    }
}
