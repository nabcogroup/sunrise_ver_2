<?php

namespace App\Http\Requests;

use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;

class ContractCalcForm extends FormRequest
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
            "villa_id" => "required",

            "period_start" => "required|date",

            "custom_rate" => array("required","regex:/^\d+?|^\d+\.\d{2}?/"),

            "period_end" => "required|date"
        ];
    }

    public function filterInput() {

        $request = $this->all();

        $request['period_start'] = Carbon::parse($request['period_start'])->toDateString();
        $request['period_end'] = Carbon::parse($request['period_end'])->toDateString();

        return $request;
    }

}
