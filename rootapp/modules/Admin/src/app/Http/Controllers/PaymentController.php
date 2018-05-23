<?php


namespace Admin\App\Http\Controllers;


use App\ContractBill;
use App\Payment;
use App\Selection;
use Illuminate\Http\Request;
use KielPack\LaraLibs\Base\Controller as LaraLibController;


class PaymentController extends LaraLibController
{

    private $paymentModel;


    public function __construct(Payment $paymentModel)
    {

        $this->middleware(['auth','admin']);

        $this->paymentModel = $paymentModel;

    }

    public function reverse(Request $request) {


        $parameter = (object)["bill_no" => $request->get('bill_no')];

        if($parameter->bill_no) {

            $bill = ContractBill::with('payments')->where('bill_no',$parameter->bill_no)->get()->first();

            $lookups = Selection::getSelections(["payment_status"]);

        }

        return view('admin::payment.fix',compact('parameter','bill','lookups','dataRowType'));
    }

    public function update(Request $request) {

        $inputs = $request->all();

        //reset if status not clear
        foreach ($inputs["payments"] as $input) {

            $payment = Payment::find($input["id"]);

            $payment->toMap($input);

            if(isset($input["revert"]) && (int)$input["revert"] == 1) {

                //revert the payment
                $payment->revert();

            }

            $payment->save();
        }

        return redirect()->route("admin.payment.reverse");

    }






}