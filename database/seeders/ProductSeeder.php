<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            [
                'name' => 'シャンプー',
                'product_category_id' => 1,
                'stock_quantity' => 10,
                'price' => 5000,
                'overview' => '髪の美しさを極める、プロフェッショナルケアのシークレットがついに解禁されました。当社の新しいシャンプーは、驚くべき結果をお届けします。髪を根本からリフレッシュし、徹底的に補修する特別な処方で、まるでサロン帰りのような輝きとツヤを手に入れることができます。',
                'is_undisclosed' => 0,
                'is_unlimited' => 0,
                'is_picked_up' => 1,
            ],
            [
                'name' => 'トリートメント',
                'product_category_id' => 1,
                'stock_quantity' => 10,
                'price' => 5000,
                'overview' => 'このトリートメントは、クリーミーなテクスチャーで髪に溶け込み、素早く浸透します。髪をやわらかく包み込みながら、根元から先まで均一に補修し、髪の輝きとなめらかさを復活させます。使用後は、指通りの良さとまとまりのある髪が手に入ります。',
                'is_undisclosed' => 0,
                'is_unlimited' => 0,
                'is_picked_up' => 1,
            ],
            [
                'name' => 'ヘアオイル',
                'product_category_id' => 1,
                'stock_quantity' => 10,
                'price' => 5000,
                'overview' => 'このヘアオイルは、軽やかなテクスチャーで、髪になじみやすく、重さを感じさせません。髪の表面を滑らかにし、広がりやすい髪を抑え、まるで絹のような触り心地を実現します。髪が一体化し、まとまりのあるスタイルが持続します。',
                'is_undisclosed' => 0,
                'is_unlimited' => 0,
                'is_picked_up' => 1,
            ],
            [
                'name' => 'ヘアワックス',
                'product_category_id' => 1,
                'stock_quantity' => 10,
                'price' => 5000,
                'overview' => 'このヘアワックスは、使いやすく、自然な仕上がりをもたらします。軽いテクスチャーで、髪に自然な光沢を与えます。均一に塗布しやすく、一日中スタイルをキープします。また、水に強い性質を持ち、湿気の多い日でもスタイルが崩れません。',
                'is_undisclosed' => 0,
                'is_unlimited' => 0,
                'is_picked_up' => 1,
            ],
        ];

        Product::insert($data);
    }
}
