<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\APIController;
use App\Http\Resources\CustomerResource;
use App\Customer;


class CustomerController extends ApiController
{
    public function __construct()
    {
        // Only authenticated requests may use API
        //$this->middleware('auth:api');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {        
        // $customers = (new Customer)->indexModel();                    
        // return CustomerResource::collection($customers);
        return CustomerResource::mockData(); // [Demo]
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $input = $request->input('values');        
        $validator = Validator::make($input, [
            'organization' => 'required'
        ]);
        if ($validator->fails()) {
            return $this->responseUnprocessable($validator->errors());
        }
              
        try {                    
            $customer = (new Customer)->storeModel($input);
            return response()->json([
                'status' => 201,
                'message' => 'Resource created.',
                'id' => $customer->id
            ], 201);
        } catch (Exception $ex) {
            return $this->responseServerError('Error creating resource.');
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {                
        $customer = Customer::first()->showModel($id);     
        return new CustomerResource($customer);        
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $input = $request->input('values');
        $validator = Validator::make($input, [
            'company' => 'required',
        ]);
        if ($validator->fails()) {
            return $this->responseUnprocessable($validator->errors());
        }

        try{
            Customer::first()->updateModel($input, $id);
            return $this->responseResourceUpdated();
        } catch (Exception $ex) {
            return $this->responseServerError('Error updating resource.');
        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $customer = Customer::where('id', $id)->firstOrFail();
        try {
            $customer->delete();
            return $this->responseResourceDeleted();
        } catch (Exception $ex) {
            return $this->responseServerError('Error deleting resource.');
        }
    }
}
