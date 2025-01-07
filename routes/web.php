<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/auth', function (Request $request) {
    $request->session()->put('state', $state = Str::random(40));

    $query = http_build_query([
        'client_id' => '9de8961e-3927-490b-84dc-a6cedbf76679',
        'redirect_url' => 'http://localhost/auth/callback',
        'state' => $state,
        // 'prompt' => '', // "none", "consent", or "login"
    ]);

    return redirect('https://accounts.nvnhan0810.com/oauth/login?' . $query);
});

Route::get('/auth/callback', function(Request $request) {
    $state = $request->session()->pull('state');

    throw_unless(
        strlen($state) > 0 && $state === $request->state,
        InvalidArgumentException::class,
        'Invalid state value.'
    );

    $response = Http::asForm()->post('https://accounts.nvnhan0810.com/oauth/token', [
        'grant_type' => 'authorization_code',
        'client_id' => '9de8961e-3927-490b-84dc-a6cedbf76679',
        'client_secret' => 'k3XLQGJHA1WlPwTRhGRDocvhjx4QURWydPSt1rwS',
        'redirect_uri' => 'http://localhost/auth/callback',
        'code' => $request->code,
    ]);

    return $response->json();
});
