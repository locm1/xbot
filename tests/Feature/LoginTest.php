<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class LoginTest extends TestCase
{
	/**
	 * A basic feature test example.
	 *
	 * @return void
	 */
	public function testLogin()
	{
		$data = [
			'login_id'              => 'admin',
			'password'                 => 'admin2345',
		];
    $response = $this->post(route('login'), $data);

		$response->assertStatus(200);
	}
}
