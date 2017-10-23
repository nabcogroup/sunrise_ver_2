<?php

namespace App\Http\Requests;

use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;

class FixedAssetForm extends FormRequest
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
            'purchase_date'     =>  'required|date',
            'description'       =>  'required',
            'property'          =>  'required',
            'fixed_asset_type'  =>  'required',
            'cost'              =>  array("required","regex:/^\d+?|^\d+\.\d{2}?/")
        ];
    }


    public function filterInput() {
        $input = $this->all();
        $input['purchase_date'] = Carbon::parse($input['purchase_date']);
        
        return $input;

    }
}
