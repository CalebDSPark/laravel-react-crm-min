<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\APIController;
use App\Http\Resources\ProductResource;
use App\Product;

class ProductController extends ApiController
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
        // $products = Product::first()->indexModel();                    
        // return ProductResource::collection($products);
        return ProductResource::mockData(); // [Demo]
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
            'code' => 'required',
            'cate' => 'required'
        ]); 
        if ($validator->fails()) {
            return $this->responseUnprocessable($validator->errors());
        }

        try{
            $product = (new Product)->storeModel($input);
            return response()->json([
                'status' => 201,
                'message' => 'Resource created.',
                'id' => $product->id
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
        $product = Product::first()->showModel($id);     
        return new ProductResource($product);
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
            'code' => 'required',
            'cate' => 'required'
        ]);
        if ($validator->fails()) {
            return $this->responseUnprocessable($validator->errors());
        }

        try{
            Product::first()->updateModel($input, $id);
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
}
