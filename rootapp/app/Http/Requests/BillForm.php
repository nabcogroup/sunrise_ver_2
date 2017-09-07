<?php

namespace App\Http\Requests;


use App\Traits\UnsetterTrait;
use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;

class BillForm extends FormRequest
{

    use UnsetterTrait;
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            //
        ];
    }

    public function getValidatorInstance()
    {
        $validator =  parent::getValidatorInstance();

        $validator->after(function() use ($validator) {
            $inputs = $this->all();
            $payments = isset($inputs['payments']) ? $inputs['payments'] : [];

            //check payment
            if(sizeof($payments) == 0) {
                $validator->errors()->add('payments','Payment must be filled');
            }
            else {
                foreach ($payments as $payment) {
                    
                    if(!strtotime($payment['effectivity_date'])) {
                        $validator->errors()->add('payments','Effective Date must be valid date');
                    }

                    if(!strtotime($payment['period_start'])) {
                        $validator->errors()->add('payments','Period Start must be valid date');
                    }

                    if(!strtotime($payment['period_end'])) {
                        $validator->errors()->add('payments','Period End must be valid date');
                    }

                    if($payment['status'] == 'clear') {
                        //check if the accounts entered
                        if($payment['bank_account'] == null) {
                            $validator->errors()->add('payments','Please enter Bank Accounts');
                        }

                    }
                }
            }
        });

        return $validator;

    }

    public function filterInput() {

        $inputs = $this->all();

        $this->unsetDateStamp($inputs);

        $this->unsetCustom(['instance','settled_amount','balance'],$inputs);

        if(isset($inputs['payments']) && sizeof($inputs['payments']) > 0) {

            foreach ($inputs['payments'] as &$payment) {

                $payment['effectivity_date'] = Carbon::parse($payment['effectivity_date']);
                $payment['period_start'] = Carbon::parse($payment['period_start']);
                $payment['period_end'] = Carbon::parse($payment['period_end']);

                if($payment['status'] == 'clear') {
                    $payment['date_deposited'] = Carbon::parse($payment['date_deposited']);
                }

                $payment['bank'] = $this->sanitizeInput($payment['bank']);
                $payment['bank_account'] = $this->sanitizeInput($payment['bank_account']);
                $payment['deposited_bank'] = $this->sanitizeInput($payment['deposited_bank']);
            }
        }

        return $inputs;
    }

}
