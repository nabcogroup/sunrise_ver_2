<?php

namespace App\Http\Requests;

use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;

class ExpenditureForm extends FormRequest
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
            'location'          =>  'required',
            'villa_id'          =>  'required|exists:villas,id',
            'expense_type'      =>  'required',
            'acct_code'         =>  'required',
            'payee'             =>  'required',
            'payment_date'      =>  'required|date',
            'mode_of_payment'   =>  'required',
            'doc_ref'           =>  'required',
            'doc_no'            =>  'required',
            'doc_date'          =>  'required|date'
        ];
    }

    public function filterInput() {

        $inputs = $this->request->all();

        $inputs['payment_date'] = Carbon::parse($inputs['payment_date']);
        
        return $inputs;

    }
}
