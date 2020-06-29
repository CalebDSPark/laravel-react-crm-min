<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{        
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = [];
   

    public function indexModel() 
    {
        return $this->all();                                
    }


    public function storeModel($input) {
        if($input['company']) { $arrInput['company'] = $input['company']; }
        if(!empty($input['first_name'])) { $arrInput['first_name'] = $input['first_name']; }
        if(!empty($input['last_name'])) { $arrInput['last_name'] = $input['last_name']; }
        if(!empty($input['email'])) { $arrInput['email'] = $input['email']; }        
        if(!empty($input['phone'])) { $arrInput['phone'] = $input['phone']; }
        if(!empty($input['address'])) { $arrInput['address'] = $input['address']; }
        if(!empty($input['city'])) { $arrInput['city'] = $input['city']; }
        if(!empty($input['province'])) { $arrInput['province'] = $input['province']; }
        if(!empty($input['country'])) { $arrInput['country'] = $input['country']; }            
        if(isset($input['status'])) { $arrInput['status'] = $input['status']; }
        if(!empty($input['memo'])) { $arrInput['memo'] = $input['memo']; }
        return $this->create($arrInput);
    }


    public function showModel($id) {
        return $this->where('id', $id)->firstOrFail();  
    }


    public function updateModel($input, $id) {
        $customer = $this->where('id', $id)->firstOrFail();                                
        if($input['company']) { $customer->company = $input['company']; }
        if($input['first_name']) { $customer->first_name = $input['first_name']; }
        if($input['last_name']) { $customer->last_name = $input['last_name']; }            
        if($input['email']) { $customer->email = $input['email']; }        
        if($input['phone']) { $customer->phone = $input['phone']; }
        if($input['address']) { $customer->address = $input['address']; }
        if($input['city']) { $customer->city = $input['city']; }
        if($input['province']) { $customer->province = $input['province']; }
        if($input['country']) { $customer->country = $input['country']; }        
        if($input['memo']) { $customer->memo = $input['memo']; }
        $customer->save();
    }
}
