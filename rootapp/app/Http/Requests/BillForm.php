<?php

namespace App\Http\Requests;

use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;

class BillForm extends FormRequest
{
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
                }
            }
        });

        return $validator;

    }

    public function filterInput() {

        $inputs = $this->all();
        if(isset($inputs['payments']) && sizeof($inputs['payments']) > 0) {
            foreach ($inputs['payments'] as &$payment) {
                $payment['effectivity_date'] = Carbon::parse($payment['effectivity_date']);
                $payment['period_start'] = Carbon::parse($payment['period_start']);
                $payment['period_end'] = Carbon::parse($payment['period_end']);
            }
        }

        return $inputs;
    }

}
