<?php

namespace App\Http\Requests;

use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;
use App\Traits\UnsetterTrait;

class RenewalForm extends FormRequest
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
            "period_start"          => "required|date",
            
            "period_end"            => "required|date",
            
            "amount"                => array("required","regex:/^\d+?|^\d+\.\d{2}?/"),
            
            "extra_days"            =>  array("required","integer"),
        ];
    }

    public function filterInput()
    {
        $result = $this->all();
        
        //prep
        $result["prep_bank"] = $this->sanitizeInput($result["prep_bank"]);
        $result["prep_due_date"] = $this->sanitizeInput($result["prep_due_date"]);
        $result["prep_ref_no"] = $this->sanitizeInput($result["prep_ref_no"]);
        $result['period_start'] = Carbon::parse($result['period_start']);
        $result['period_end'] = Carbon::parse($result['period_end']);
       
        if($result["contract_type"] == "legalized") {
            //prepare configure
            $configure = [
                "prep_series"   => $result["prep_series"],
                "prep_bank"     => $result["prep_bank"],
                "prep_due_date" => $result["prep_due_date"],
                "prep_ref_no"   => $result["prep_ref_no"]
            ];
            $result['configure'] = $configure;
        }

        $this->unsetCustom(["prep_series","prep_bank","prep_due_date","prep_ref_no"],$result);

        return $result;
    }
}
