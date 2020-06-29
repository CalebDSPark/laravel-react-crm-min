<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// /api/auth/login ...
Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {    
    Route::post('login', 'Auth\LoginController@login');
    Route::post('logout', 'Auth\LogoutController@logout');
    Route::post('register', 'Auth\RegisterController@register');
    Route::post('update', 'Auth\UpdateController@update');
});

// api/customers
Route::group([
    'middelware' => 'api',    
], function () {
    Route::apiResource('customers', 'CustomerController'); // exclude 'create', 'edit'
});

// api/payments
Route::group([
    'middelware' => 'api',    
], function () {
    Route::apiResource('payments', 'PaymentController'); // exclude 'create', 'edit'
    Route::get('payments/customer/{id}', 'PaymentController@index_customer');
});

// api/products
Route::group([
    'middelware' => 'api',    
], function () {
    Route::apiResource('products', 'ProductController'); // exclude 'create', 'edit'    
});


// api/invoices
Route::group([
    'middelware' => 'api',    
], function () {    
    Route::apiResource('invoices', 'InvoiceController'); // exclude 'create', 'edit'
});

