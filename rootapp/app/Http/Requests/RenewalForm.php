<?php

namespace App\Http\Requests;

use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;

class RenewalForm extends FormRequest
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
            'period_start'  =>  'required|date',

            'period_end'    =>  'required|date',

            'amount'        =>  array("required","regex:/^\d+?|^\d+\.\d{2}?/")
        ];
    }

    public function filterInput() {

        $request = $this->request->all();

        $request['period_start'] = Carbon::parse($request['period_start']);

        $request['period_end'] = Carbon::parse($request['period_end']);

        return $request;
    }
}
