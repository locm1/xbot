<?php

namespace App\Http\Controllers\api\paypay;

use Illuminate\Http\Request;
use PayPay\OpenPaymentAPI\Client;
use PayPay\OpenPaymentAPI\Models\CreateQrCodePayload;
use PayPay\OpenPaymentAPI\Models\OrderItem;

class PayPayClient
{
  public function createClient()
  {
    $client = new Client([
      'API_KEY' => 'a_xYN2M63jbr_2E8I',
      'API_SECRET' => 'yGTFLRNQfhBZ3t/7uHtcYmgzhqxOfiLq1QMRRoBFOII=',
      'MERCHANT_ID' => '653967719775010816'
    ], false);
    /* production_mode : Set the connection destination of the sandbox environment / production environment. 
    The default false setting connects to the sandbox environment. The True setting connects to the production environment. */

    return $client;
  }

  public function qr(Request $request)
  {
    $client = $this->createClient();
    // setup payment object
    $CQCPayload = new CreateQrCodePayload();

    // Set merchant pay identifier
    $CQCPayload->setMerchantPaymentId($request->transactionId);

    // Log time of request
    $CQCPayload->setRequestedAt();
    // Indicate you want QR Code
    $CQCPayload->setCodeType("ORDER_QR");

    // Provide order details for invoicing
    $OrderItems = [];
    $OrderItems[] = (new OrderItem())
      ->setName('Cake')
      ->setQuantity(1)
      ->setUnitPrice(['amount' => 20, 'currency' => 'JPY']);
    $CQCPayload->setOrderItems($OrderItems);

    // Save Cart totals
    $amount = [
      "amount" => 1,
      "currency" => "JPY"
    ];
    $CQCPayload->setAmount($amount);
    // Configure redirects
    $CQCPayload->setRedirectType('WEB_LINK');
    $CQCPayload->setRedirectUrl("https://liff.line.me/1660723896-RmovvEYY?path=paypay");

    // Get data for QR code
    $response = $client->code->createQRCode($CQCPayload);

    return $response['data'];
  }
}
