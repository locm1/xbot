<?php

namespace App\Services\liff\mail;

use Illuminate\Support\Facades\Mail;
use App\Mail\OrderMail;
use App\Models\Product;
use App\Services\management\ec_configuration\EcommerceConfigurationService;

class OrderMailService
{
    private $ecommerce_service;

    public function __construct(EcommerceConfigurationService $ecommerce_service)
    {
        $this->ecommerce_service = $ecommerce_service;
    }

    public function sendOrderMail($order, $order_products)
    {
        $product_ids = array_column($order_products, 'product_id');
        $products = Product::whereIn('id', $product_ids)->get();
        $configuration = $this->ecommerce_service->index();
        if (isset($configuration->email)) {
            Mail::send(new OrderMail($configuration->email, $order, $products));
        }
    }
}
