<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
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
            'code' => $this->code, 
            'cate' => $this->cate,            
            'type' => $this->type,
            'name' => $this->name,
            'price' => $this->price,                                     
            'desc' => $this->desc, 
            'status' => $this->status,
            'customized_product' => [
                'price' => $this->product_price,
                'qty' => $this->product_qty
            ]       
        ];
    }

    static public function mockData() {
        return ["data" => [
            [
                "id" => 1,
                "code" => 10100,
                "cate" => 1,
                "name" => "Phone Holder for Car",
                "price" => "16.99"                
            ],
            [
                "id" => 2,
                "code" => 10200,
                "cate" => 2,
                "name" => "Softsoap",
                "price" => "5.99"                
            ],
            [
                "id" => 3,
                "code" => 10300,
                "cate" => 3,
                "name" => "Professional Cooking",
                "price" => "35.99"                
            ],
            [
                "id" => 4,
                "code" => 10400,
                "cate" => 4,
                "name" => "Macbook Pro 16 inch",
                "price" => "2999.00"                
            ],
            [
                "id" => 5,
                "code" => 10410,
                "cate" => 4,
                "name" => "Macbook Pro 13 inch",
                "price" => "2777.00"                
            ],
            [
                "id" => 6,
                "code" => 10420,
                "cate" => 4,
                "name" => "Macbook Air",
                "price" => "1399.00"                
            ],
            [
                "id" => 7,
                "code" => 10500,
                "cate" => 5,
                "name" => "Dinner Original Cheese",
                "price" => "30.00"                
            ],
            [
                "id" => 8,
                "code" => 10600,
                "cate" => 6,
                "name" => "Pure Protein Bars",
                "price" => "6.97"                
            ],
            [
                "id" => 9,
                "code" => 10900,
                "cate" => 9,
                "name" => "OfficeSuite Home",
                "price" => "129.99"                
            ]
        ]];

    }
}
