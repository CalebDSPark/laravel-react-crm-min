<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class InvoiceResource extends JsonResource
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
            'customer_id' => $this->customer_id,
            'subscription_id' => $this->subscription_id,
            'type' => $this->type,
            'total_price' => $this->total_price,
            'total_gst' => $this->total_gst,
            'total_pst' => $this->total_pst,
            'overdue_amount' => $this->overdue_amount,
            'paid_at' => $this->paid_at,
            'status' => $this->status,
            'customer'  => [
                'organization' => $this->organization,            
                'address' => $this->address,            
                'city' => $this->city,            
                'province' => $this->province,            
                'country' => $this->country         
            ],
            'subscription'  => [
                'name' => $this->subscription_name, 
                'renewal_at' => $this->renewal_at,
                'ending_at' => $this->ending_at     
            ]
        ];      
    }



    static public function mockData() {
        return ["data" => [
                [
                    "id" => 1,
                    "customer" => "Samsung",
                    "price" => 127.00,
                    "gst" => 6.35,
                    "pst" => 8.89,            
                    "status" => 0,                    
                ],
                [
                    "id" => 2,
                    "customer" => "Samsung",
                    "price" => 225.00,
                    "gst" => 11.25,
                    "pst" => 15.75,            
                    "status" => 1,                    
                ],
                [
                    "id" => 3,
                    "customer" => "Apple",
                    "price" => 100.00,
                    "gst" => 5.00,
                    "pst" => 7.00,            
                    "status" => 0,                    
                ],
                [
                    "id" => 4,
                    "customer" => "Apple",
                    "price" => 328.00,
                    "gst" => 16.40,
                    "pst" => 22.96,            
                    "status" => 1,                    
                ],
                [
                    "id" => 5,
                    "customer" => "LG",
                    "price" => 300.00,
                    "gst" => 15.00,
                    "pst" => 21.00,            
                    "status" => 1,                    
                ],
                [
                    "id" => 6,
                    "customer" => "Amazon",
                    "price" => 50.00,
                    "gst" => 2.50,
                    "pst" => 3.50,            
                    "status" => 0,                    
                ],
                [
                    "id" => 7,
                    "customer" => "Amazon",
                    "price" => 187.00,
                    "gst" => 9.35,
                    "pst" => 13.09,            
                    "status" => 1,                    
                ],
                [
                    "id" => 8,
                    "customer" => "Facebook",
                    "price" => 100.00,
                    "gst" => 5.00,
                    "pst" => 7.00,            
                    "status" => 0,                    
                ],
                [
                    "id" => 9,
                    "customer" => "Facebook",
                    "price" => 200.00,
                    "gst" => 10.00,
                    "pst" => 14.00,            
                    "status" => 2,                    
                ],
                [
                    "id" => 10,
                    "customer" => "Google",
                    "price" => 250.00,
                    "gst" => 12.50,
                    "pst" => 17.50,            
                    "status" => 1,                    
                ],
                [
                    "id" => 11,
                    "customer" => "IBM",
                    "price" => 200.00,
                    "gst" => 10.00,
                    "pst" => 14.00,            
                    "status" => 0,                    
                ],
                [
                    "id" => 12,
                    "customer" => "Google",
                    "price" => 115.00,
                    "gst" => 5.75,
                    "pst" => 8.05,            
                    "status" => 1,                    
                ],
                [
                    "id" => 13,
                    "customer" => "Microsoft",
                    "price" => 325.00,
                    "gst" => 16.25,
                    "pst" => 22.75,            
                    "status" => 1,                    
                ],
                [
                    "id" => 14,
                    "customer" => "Walmart",
                    "price" => 375.00,
                    "gst" => 18.75,
                    "pst" => 26.25,            
                    "status" => 1,                    
                ],
                [
                    "id" => 15,
                    "customer" => "Disney",
                    "price" => 299.00,
                    "gst" => 14.95,
                    "pst" => 20.93,            
                    "status" => 0,                    
                ],
                [
                    "id" => 16,
                    "customer" => "Netflix",
                    "price" => 385.00,
                    "gst" => 19.25,
                    "pst" => 26.95,            
                    "status" => 1,                    
                ],

            
        ]];
    }

}
