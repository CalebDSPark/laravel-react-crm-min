<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\APIController;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;

class LoginController extends APIController
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {        
        $credentials = request(['username', 'password']);
        if (! $token = auth()->attempt($credentials)) {
            return $this->responseUnauthorized();
        }
        return $this->respondWithToken($token);
    }

    protected function respondWithToken($token)
    {
        // Get the user data.
        $user = auth()->user();

        return response()->json([
            'status' => 200,
            'message' => 'Authorized',
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60, // 5h (default: 1h, jwt.php)
            'user' => array(
                'id' => $user->id,
                'first_name' => $user->first_name,
                'last_name' => $user->last_name,
                'email' => $user->email,
                'phone' => $user->phone
            )
        ]);
    }

}
