<?php

namespace Tests\Feature\Common;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class GetAllWithPaginator  
{
  public function __invoke(Model $model, string $firstKeyName): array
  {
    $keys = array_keys($model->toArray());
    return [
      $firstKeyName => [
        'current_page', 
        'first_page_url', 
        'from', 
        'last_page', 
        'last_page_url', 
        'next_page_url',
        'path',
        'per_page',
        'prev_page_url',
        'to',
        'total',
        'data' => ['*' => $keys],
        'links' => [
          '*' => [
            'url', 'label', 'active'
          ]
        ]
      ]
    ];
  }
}
