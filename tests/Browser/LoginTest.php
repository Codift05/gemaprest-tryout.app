<?php

namespace Tests\Browser;

use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Laravel\Dusk\Browser;
use Tests\DuskTestCase;

class LoginTest extends DuskTestCase
{
    use DatabaseMigrations;

    public function test_user_can_see_login_page(): void
    {
        $this->browse(function (Browser $browser) {
            $browser->visit('/login')
                ->assertSee('Masuk')
                ->assertPresent('#email')
                ->assertPresent('#password');
        });
    }

    public function test_user_can_login_with_valid_credentials(): void
    {
        $user = User::factory()->siswa()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('password123'),
        ]);

        $this->browse(function (Browser $browser) use ($user) {
            $browser->visit('/login')
                ->type('#email', 'test@example.com')
                ->type('#password', 'password123')
                ->press('button[type="submit"]')
                ->waitForLocation('/dashboard', 10)
                ->assertPathIs('/dashboard');
        });
    }

    public function test_user_sees_error_with_wrong_credentials(): void
    {
        User::factory()->siswa()->create(['email' => 'test@example.com']);

        $this->browse(function (Browser $browser) {
            $browser->visit('/login')
                ->type('#email', 'test@example.com')
                ->type('#password', 'wrong-password')
                ->press('button[type="submit"]')
                ->waitForText('Kredensial', 10)
                ->assertSee('Kredensial');
        });
    }

    public function test_authenticated_user_is_redirected_from_login(): void
    {
        $user = User::factory()->siswa()->create();

        $this->browse(function (Browser $browser) use ($user) {
            $browser->loginAs($user)
                ->visit('/login')
                ->assertPathIs('/dashboard');
        });
    }
}
