<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CustomerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        // return parent::toArray($request);
        return [
            'id' => $this->id,             
            'company' => $this->company, 
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'email' => $this->email,        
            'phone' => $this->phone,             
            'address' => $this->address, 
            'city' => $this->city, 
            'province' => $this->province, 
            'country' => $this->country,
            'status' => $this->status,          
            'memo' => $this->memo            
        ];
    }


    static public function mockData() {
        return ["data" => [
                [
                    "id" => 1,
                    "company" => "Samsung",
                    "first_name" => "James",
                    "last_name" => "Johns",
                    "email" => "jj@calebpark.com",            
                    "phone" => "604-655-9734",
                    "address" => "456 Marsh Ave",
                    "city" => "Chilliwack",
                    "province" => "BC",
                    "country" => "Canada",
                    "status" => 1,
                    "memo" => "This is first company"   
                ],
                [
                    "id" => 2,
                    "company" => "Apple",
                    "first_name" => "Steve",
                    "last_name" => "Jobs",
                    "email" => "sj@calebpark.com",            
                    "phone" => "778-659-9781",
                    "address" => "190 King George",
                    "city" => "Surrey",
                    "province" => "BC",
                    "country" => "Canada",
                    "status" => 0,
                    "memo" => "" 
                ],
                [
                    "id" => 3,
                    "company" => "LG",
                    "first_name" => "Jason",
                    "last_name" => "Rossi",
                    "email" => "jr@calebpark.com",            
                    "phone" => "778-645-0374",
                    "address" => "55 Hornby St",
                    "city" => "Vancouver",
                    "province" => "BC",
                    "country" => "Canada",
                    "status" => 1,
                    "memo" => ""         
                ],
                [
                    "id" => 4,
                    "company" => "Amazon",
                    "first_name" => "Dave",
                    "last_name" => "Kim",
                    "email" => "dk@calebpark.com",            
                    "phone" => "604-778-9038",
                    "address" => "333 Lytton St",
                    "city" => "North Vancouver",
                    "province" => "BC",
                    "country" => "Canada",
                    "status" => 1,
                    "memo" => ""
                ],
                [
                    "id" => 5,
                    "company" => "Facebook",
                    "first_name" => "Ken",
                    "last_name" => "Grace",
                    "email" => "kg@calebpark.com",            
                    "phone" => "778-634-4368",
                    "address" => "120 Derwent",
                    "city" => "Delta",
                    "province" => "BC",
                    "country" => "Canada",
                    "status" => 1,
                    "memo" => ""  
                ],
                [
                    "id" => 6,
                    "company" => "Google",
                    "first_name" => "Paul",
                    "last_name" => "Lee",
                    "email" => "pl@calebpark.com",            
                    "phone" => "604-687-3638",
                    "address" => "10th Street",
                    "city" => "Port Coquitlam",
                    "province" => "BC",
                    "country" => "Canada",
                    "status" => 0,
                    "memo" => "" 
                ],
                [
                    "id" => 7,
                    "company" => "IBM",
                    "first_name" => "Sand",
                    "last_name" => "Jense",
                    "email" => "sj@calebpark.com",            
                    "phone" => "778-214-1477",
                    "address" => "111 Cottonwood",
                    "city" => "Coquitlam",
                    "province" => "BC",
                    "country" => "Canada",
                    "status" => 1,
                    "memo" => ""   
                ]                
        ]];        
    } 
}
