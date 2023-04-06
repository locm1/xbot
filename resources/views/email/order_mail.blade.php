@php
  $payment_methods = ['クレジットカード', '代金引き換え'];
  $delivery_times = [
    '指定なし', '午前中', '12:00 〜 14:00', '14:00 〜 16:00', 
    '16:00 〜 18:00', '18:00 〜 20:00', '19:00 〜 21:00', '20:00 〜 21:00'
];
@endphp

新しい注文がありましたことをお知らせいたします。

注文詳細は以下の通りです。

【ご注文内容】
──────────────
・注文番号：{{ $order->id }}
・注文日時：{{ $order->created_at }}
・支払い方法：{{ $payment_methods[$order->payment_method - 1] }}
・配送時間帯：{{ $delivery_times[$order->delivery_time - 1] }}

@foreach ($order_products as $product)
  ・商品名：{{ $product->name }}
  ・価格：{{ $product->price }}円
@endforeach

・合計金額：{{ $order->purchase_amount }}円
・お届け先：
〒{{ $order->zipcode }}
{{ $order->prefecture }}{{ $order->city }}{{ $order->address }}{{ $order->building_name }}
・電話番号：{{ $order->tel }}
──────────────

管理画面URL：
http://localhost:8000/manage/ec/order/detail/{{ $order->id }}

上記の情報を確認のうえ、お届けまでの手配をお願いいたします。