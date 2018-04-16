<?php

namespace Contract\App\Http\Requests;

use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;


class ContractForm extends FormRequest
{

    use UnsetterTrait;

    public function authorize()
    {
        return true;
    }

    public function messages()
    {
        $tenantType = $this->input('register_tenant.type');
        $message = array();
        if($tenantType == 'individual') {
            $message = [
                "reg_name"  =>  "Full Name is required",
                "reg_id"    =>  "Qatar Id is required",
                "reg_date"  =>  "Birthday is required"
            ];
        }
        else {
            $message = [
                "reg_name"  =>  "Business Name is required",
                "reg_id"    =>  "CR No is required",
                "reg_date"  =>  "Validity Date is required"
            ];
        }

        return [
            'register_tenant.full_name.required'        => $message['reg_name'],
            'register_tenant.email_address.required'    => 'Email is required',
            'register_tenant.email_address.email'    => 'Email must be valid email address',
            'register_tenant.reg_id.required'           => $message['reg_id'],
            'register_tenant.reg_date.required'         => $message['reg_date'],
            'register_tenant.email_address.email.required'       => 'Email must be valid',
            'register_tenant.mobile_no.required_without_all'                 =>  'Please enter mobile no or tel no',
            "register_tenant.tenant_address.address_1.required"          =>  'Address is required',
            "register_tenant.tenant_address.city.required"                =>  'City is required',
            "register_tenant.tenant_address.postal_code.required"         =>  'Postal Code is required'
        ];
    }


    public function rules()
    {
        return [
            "period_start"          => "required|date",
            "period_end"            => "required|date",
            "amount"                => array("required","regex:/^\d+?|^\d+\.\d{2}?/"),
            "extra_days"            =>  array("required","integer"),
            "villa_id"              =>  "required|exists:villas,id",
            "register_tenant.type"          =>  "required",
            "register_tenant.full_name"     =>  "required",
            "register_tenant.reg_date"     =>  "required|date",
            "register_tenant.reg_id"     =>  "required",
            "register_tenant.email_address" =>  "required|email",
            "register_tenant.mobile_no" =>  "required_without_all:register_tenant.tel_no",
            "register_tenant.tenant_address.address_1"        =>  'required',
            "register_tenant.tenant_address.city"             =>  'required',
            "register_tenant.tenant_address.postal_code"      =>  'required'
        ];
    }

    public function getValidatorInstance() {

        $validator = parent::getValidatorInstance();
        $validator->after(function() use ($validator){
            $input = $this->all();
            if(!isset($input['period_start']) || $input['period_start'] == null ) {
                return $validator;
            }

            $periodStart = Carbon::parse($input['period_start']);
            $periodEnd = Carbon::parse($input['period_end']);
            
            if ($periodStart > $periodEnd) {
                $validator->errors()->add('start', 'Start must be later than end date');
            }
        });

        return $validator;
    }

    public function filterInput() {

        $result = $this->all();
        
        //prep
        $result["prep_bank"] = $this->sanitizeInput($result["prep_bank"]);
        $result["prep_due_date"] = $this->sanitizeInput($result["prep_due_date"]);
        $result["prep_ref_no"] = $this->sanitizeInput($result["prep_ref_no"]);
        $result['period_start'] = Carbon::parse($result['period_start']);
        $result['period_end'] = Carbon::parse($result['period_end']);
        $result['register_tenant']['reg_date'] = Carbon::parse($result['register_tenant']['reg_date']);
       
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
        
        $this->unsetCustom(["villa_list","prep_series","prep_bank","prep_due_date","prep_ref_no"],$result);
        
        return $result;

    }
}
