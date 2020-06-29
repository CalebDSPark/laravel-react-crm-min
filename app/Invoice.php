<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Customer;
use App\ProductSubscription;
use App\Subscription;

class Invoice extends Model
{
    public $timestamp = false; 

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
     protected $guarded = [];


    public function indexModel() {    	 
        //return $this->all();
        return $this->join('customers AS C', 'invoices.customer_id', '=', 'C.id')
                    ->join('subscriptions AS S', 'invoices.subscription_id', '=', 'S.id')
        			->select('invoices.*', 'C.organization', 'S.name as subscription_name')
        			->get();
    }


    public function storeModel($input) {
        $type = $input['type'];
        $arrInput = [];
        if($type == 1) { // subscription invoice

            // check customer's 'gst_applicable' and 'pst_num'
            $customer = Customer::first()->showModel($input['customer_id']);   
            if(empty($customer)) { return false; }

            // get 'total_price'
            $total_price = ProductSubscription::first()->getTotalPrice($input['subscription_id']);
            
            // get 'total_gst'
            $total_gst = 0; 
            if($customer['gst_applicable'] == 1) {
                $total_gst = ProductSubscription::first()->getTotalGst($input['subscription_id']);
            } 

            // get 'total_pst'
            $total_pst = 0; 
            if(empty($customer['pst_num'])) {
                $total_pst = ProductSubscription::first()->getTotalPst($input['subscription_id']);
            }

            // check 'overdue_amount'
            $overdue_amount = $this->getOverdueAmount($input['customer_id'], $input['subscription_id']);

            if(isset($input['subscription_id'])) { $arrInput['subscription_id'] = $input['subscription_id']; }
            $arrInput['total_price'] = $total_price; 
            $arrInput['total_gst'] = $total_gst; 
            $arrInput['total_pst'] = $total_pst; 
            if($overdue_amount) { $arrInput['overdue_amount'] = $overdue_amount; }                    

        } else if ($type == 2) { // one-time manual invoice
            if(isset($input['total_price'])) { $arrInput['total_price'] = $input['total_price']; }
            if(isset($input['total_gst'])) { $arrInput['total_gst'] = $input['total_gst']; }
            if(isset($input['total_pst'])) { $arrInput['total_pst'] = $input['total_pst']; }
            if(isset($input['overdue_amount'])) { $arrInput['overdue_amount'] = $input['overdue_amount']; }
        }

        if(isset($input['customer_id'])) { $arrInput['customer_id'] = $input['customer_id']; }   
        $arrInput['type'] = $type; 
        $arrInput['status'] = 0; // unpaid   	
        return $this->create($arrInput);
    }

    public function showModel($id) {
    	// return $this->where('id', $id)->firstOrFail();
        return $this->join('customers AS C', 'invoices.customer_id', '=', 'C.id')
                    ->join('subscriptions AS S', 'invoices.subscription_id', '=', 'S.id')
                    ->where('invoices.id', $id)
                    ->select('invoices.*', 'C.organization', 'C.address', 'C.city', 
                        'C.province', 'C.country', 'S.name as subscription_name', 
                        'S.renewal_at', 'S.ending_at')
                    ->firstOrFail();
    }


    public function updateModel($input, $id) {
    	$invoice = $this->where('id', $id)->firstOrFail();
    	if(isset($input['customer_id'])) { $invoice->customer_id = $input['customer_id']; }
    	if(isset($input['subscription_id'])) { $invoice->subscription_id = $input['subscription_id']; }
    	if(isset($input['type'])) { $invoice->type = $input['type']; }
    	if(isset($input['total_price'])) { $invoice->total_price = $input['total_price']; }
    	if(isset($input['total_gst'])) { $invoice->total_gst = $input['total_gst']; }
    	if(isset($input['total_pst'])) { $invoice->total_pst = $input['total_pst']; }
    	if(isset($input['overdue_amount'])) { $invoice->overdue_amount = $input['overdue_amount']; }        
    	if(isset($input['status'])) { $invoice->status = $input['status']; }

        // if. status = 1 (paid), save 'paid_at'
        if($input['status'] == 1) {
            date_default_timezone_set('UTC');            
            $invoice->paid_at = date('Y-m-d H:i:s');
        }
        $invoice->save();

        // if. type = 1 (subscription)
        if($input['type'] == 1) {
            // change subscription's 'renewal_date', 'ending_date', 'status'
            Subscription::first()->updatePaidStatus($input['subscription_id']);     	
        }
    }

    // get 'overdue amount'
    public function getOverdueAmount($customerId, $subscriptionId) {
        $overdue = 0;         
        $invoice = $this->where('customer_id', $customerId)
                        ->where('subscription_id', $subscriptionId)
                        ->orderBy('id', 'desc')
                        ->first();
        if($invoice && $invoice->status == 0) {
            $overdue = $invoice->total_price + $invoice->total_gst + $invoice->total_pst;

            // update status: 'unpaid' -> 'inactive'
            $invoice->status = 2; 
            $invoice->save();
        } 
        return $overdue;
    }




    public function test() {
        // return ProductSubscription::first()->getTotalPst(2);
        //return Customer::first()->showModel(161441);  
        return Subscription::first()->updatePaidStatus(4);
    }


}
