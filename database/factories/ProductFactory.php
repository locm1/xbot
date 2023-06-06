<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $products = file(database_path('resources/products.txt'));
        $overviews = [
            '当社のプロフェッショナルヘアドライヤーは、高性能と使いやすさを兼ね備えた優れた製品です。パワフルな風力と静音設計により、素早く髪を乾かすことができます。また、イオンテクノロジーにより、髪の静電気を抑え、つややかな仕上がりを実現します。さらに、3つの熱風モードと2つの冷風モードを備えており、髪の状態やスタイルに合わせて使い分けることができます。ヘアスタイリングの必需品として、プロフェッショナルなパフォーマンスを提供します。',
            'ワイヤレスBluetoothイヤフォンは、自由な動きを可能にする革新的な製品です。最新のBluetoothテクノロジーを採用し、高品質な音楽体験を提供します。快適な装着感と耳にフィットするデザインで、長時間の使用でも疲れにくくなっています。また、ノイズキャンセリング機能により、外部の騒音を遮断し、純粋なサウンドを楽しむことができます。さらに、防水性能も備えており、スポーツやアウトドアの活動にも最適です。',
            '折りたたみ式キャンプチェアは、キャンプやピクニックなどのアウトドア活動に最適な携帯用チェアです。軽量でコンパクトなデザインながら、頑丈な構造を備えています。耐久性のある素材と補強されたスチールフレームにより、安定感と快適さを提供します。背もたれの角度を調節できる機能もあり、座り心地を自由に調整できます。また、収納袋も付属しており、持ち運びや収納も簡単です。',
            'キッズ用インタラクティブロボットは、子供たちの学習や遊びをサポートするエンターテイメントロボットです。音声認識技術と人工知能を活用し、子供たちとの対話や学習プログラムを提供します。子供たちはロボットとコミュニケーションを取りながら、数学、言語、プログラミングなどのスキルを楽しく学ぶことができます。また、多彩なゲームやアクティビティも備えており、子供たちの創造性と想像力を刺激します。',
            'ダイヤモンドエンゲージリングは、特別な瞬間を祝福するための贈り物に最適なジュエリーです。高品質なダイヤモンドを使用し、美しい輝きと輝度を実現しています。華奢なデザインと上品な細工が施されたリングは、女性の手元を一層魅力的に演出します。結婚指輪としても人気のある商品であり、永遠の愛を象徴するシンボルとして喜ばれることでしょう。特別な人へのプレゼントとして最適です。'
        ];

        return [
            'name' => fake()->randomElement($products),
            'product_category_id' => fake()->numberBetween(1, 10),
            'stock_quantity' => fake()->randomNumber(3),
            'price' => fake()->randomNumber(5),
            'overview' => fake()->randomElement($overviews),
            'is_undisclosed' => 0,
            'is_unlimited' => 0,
            'is_picked_up' => fake()->numberBetween(0, 1),
        ];
    }
}
