<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\APIController;
use App\Providers\RouteServiceProvider;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class UpdateController extends APIController
{
   
    public function update(Request $request)
    {        
        // Get user from $request token.
        if (! $user = auth()->setRequest($request)->user()) {
            return $this->responseUnauthorized();        
        }
       
        $input = $request->input('update');                                

        try {
            $user = User::where('id', $input['id'])->firstOrFail();                        
            
            if ($input['email']) {
                $user->email = $input['email'];
            }
            if ($input['phone']) {
                $user->phone = $input['phone'];
            }

            $user->save();            
            return $this->responseResourceUpdated();
            
        } catch (Exception $e) {
            return $this->responseServerError('Error updating resource.');
        }
    }
    
}
