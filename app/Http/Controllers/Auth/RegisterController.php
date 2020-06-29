<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\APIController;
use App\Providers\RouteServiceProvider;
use App\User;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class RegisterController extends APIController
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
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
        $this->middleware('guest');
    }


    public function register(Request $request)    
    {        
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|max:255',
            // 'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:4|confirmed',
        ]);

        if ($validator->fails()) {
            return $this->responseUnprocessable($validator->errors());            
        }

        try {
            $user = $this->create($request->all());
            return $this->responseSuccess('Registered successfully.');            
        } catch (Exception $e) {
            return $this->responseServerError('Registration error.');            
        }
    }
    
    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\User
     */
    protected function create(array $data)    
    {        
        $chk_data = [];
        $chk_data['username'] = $data['username'];
        $chk_data['password'] = Hash::make($data['password']);
        if(isset($data['first_name'])) { $chk_data['first_name'] = $data['first_name']; }
        if(isset($data['last_name'])) { $chk_data['last_name'] = $data['last_name']; }
        if(isset($data['email'])) { $chk_data['email'] = $data['email']; }
        if(isset($data['phone'])) { $chk_data['phone'] = $data['phone']; }
        
        return User::create($chk_data);
    }
   
}
