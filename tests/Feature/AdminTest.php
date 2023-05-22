<?php

namespace Tests\Feature;

use App\Models\Admin;
use App\Models\User;
use Database\Factories\AdminFactory;
use Tests\Feature\Common\GetAllWithPaginator;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AdminTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testIndex()
    {
        $response = $this->actingAs(Admin::find(1))->get('/api/v1/management/admins');

        $withPaginator = new GetAllWithPaginator();
        $response
            ->assertJsonStructure($withPaginator(Admin::find(1), 'admins'))
            ->assertStatus(200);
    }

    public function testStore()
    {
        $password = fake()->sentence();
        $data = [
            'login_id' => fake()->word(),
            'name' => fake()->name(),
            'role' => fake()->numberBetween(1, 3),
            'password' => $password,
            'password_confirmation' => $password,
        ];
        $response = $this->actingAs(Admin::find(1))
                         ->post('/api/v1/management/admins', $data)
                         ->assertStatus(200);
        
    }

    public function testShow()
    {
        $response = $this->actingAs(Admin::find(1))
                         ->get('/api/v1/management/admins/1')
                         ->assertJsonStructure([
                            'admin' => [
                                'id',
                                'login_id',
                                'name',
                                'role',
                                'deleted_at',
                                'created_at',
                                'updated_at'
                            ]])
                         ->assertStatus(200);
    }
}
