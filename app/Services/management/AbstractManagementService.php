<?php

namespace App\Services\management;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

abstract class AbstractManagementService
{
    abstract public function index();

    abstract public function store($request);

    abstract public function show(Model $model);

    abstract public function update($request, Model $model);

    abstract public function destroy(Model $model);
}