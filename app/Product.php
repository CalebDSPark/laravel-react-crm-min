<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    public $timestamps = false;

     /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
     protected $guarded = [];


    public function indexModel() {
        return $this->all();
    }


    public function storeModel($input) {

        $arrInput = [];
        if(isset($input['code'])) { $arrInput['code'] = $input['code']; }
        if(isset($input['cate'])) { $arrInput['cate'] = $input['cate']; }        
        if(isset($input['type'])) { $arrInput['type'] = $input['type']; }
        if(!empty($input['name'])) { $arrInput['name'] = $input['name']; }
        if(isset($input['price'])) { $arrInput['price'] = $input['price']; }
        if(isset($input['quota'])) { $arrInput['quota'] = $input['quota']; }
        if(isset($input['extra_fee'])) { $arrInput['extra_fee'] = $input['extra_fee']; }
        if(isset($input['gst_applicable'])) { $arrInput['gst_applicable'] = $input['gst_applicable']; }
        if(isset($input['pst_applicable'])) { $arrInput['pst_applicable'] = $input['pst_applicable']; }
        if(!empty($input['desc'])) { $arrInput['desc'] = $input['desc']; }
        if(isset($input['status'])) { $arrInput['status'] = $input['status']; }
        return $this->create($arrInput);
    }


    public function showModel($id) {
        return $this->where('id', $id)->firstOrFail();  
    }


     public function updateModel($input, $id) {
     	$product = $this->where('id', $id)->firstOrFail();
     	if(isset($input['code'])) { $product->code = $input['code']; }
     	if(isset($input['cate'])) { $product->cate = $input['cate']; }        
        if(isset($input['type'])) { $product->type = $input['type']; }
        if(!empty($input['name'])) { $product->name = $input['name']; }
        if(isset($input['price'])) { $product->price = $input['price']; }
        if(isset($input['quota'])) { $product->quota = $input['quota']; }
        if(isset($input['extra_fee'])) { $product->extra_fee = $input['extra_fee']; }
        if(isset($input['gst_applicable'])) { $product->gst_applicable = $input['gst_applicable']; }
        if(isset($input['pst_applicable'])) { $product->pst_applicable = $input['pst_applicable']; }
        if(!empty($input['desc'])) { $product->desc = $input['desc']; }
        if(isset($input['status'])) { $product->status = $input['status']; }
        $product->save();
     }
}
