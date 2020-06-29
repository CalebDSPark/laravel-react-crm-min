<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\APIController;
use App\Http\Resources\InvoiceResource;
use App\Invoice;
use App\Subscription;

class InvoiceController extends ApiController
{
    public function __construct()
    {
        // Only authenticated requests may use API
        // $this->middleware('auth:api');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {        
        // $invoices = (new Invoice)->indexModel();                       
        // return InvoiceResource::collection($invoices);
        return InvoiceResource::mockData(); // [Demo]
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
            'customer_id' => 'required',
            'type' => 'required'
        ]);
        if ($validator->fails()) {
            return $this->responseUnprocessable($validator->errors());
        }

        try {
            $invoice = (new Invoice)->storeModel($input);
            if($invoice) {
                // change status of subscription: 'Pending' -> 'Generated'
                Subscription::first()->updateStatus($invoice->subscription_id, 2);
            }

            return response()->json([
                'status' => 201,
                'message' => 'Resource created.',
                'id' => $invoice->id
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
        $invoice = Invoice::first()->showModel($id);
        return new InvoiceResource($invoice);        
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
            'customer_id' => 'required'
        ]);
        if ($validator->fails()) {
            return $this->responseUnprocessable($validator->errors());
        }

        try{
            Invoice::first()->updateModel($input, $id);
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
        //
    }


    public function test()
    {
        return Invoice::first()->test();             
    }
}
