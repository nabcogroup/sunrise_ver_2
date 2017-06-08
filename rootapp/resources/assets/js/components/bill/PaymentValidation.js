export const validatePayment = function () {

    let duplicateOrEmpty = (entity, compArray, field) => {
        console.log(compArray);
        for (let i = 0; i < compArray.length; i++) {
            let item = compArray[i];
            console.log(item);
            if (entity[field] === item[field]) return true;
        }
        return false;
    }

    let isEmpty = (value, ...args) => {
        for (let i = 0; i <= args.length; i++) {
            if (_.trim(value[args[i]]).length === 0) return args[i];
        }
        return "";
    }

    let validateDate = (entity, ...arg) => {
        for (var i; i < arg.length; i++) {
            let d = moment((entity[arg[i]]));
            if (d == null || !d.isValid()) {
                return arg[i];
            }
        }
        return "";
    }

    let dateRangePeriod = (startPeriod, startEnd) => {

        if (moment(startPeriod).isAfter(moment(startEnd)) ||
            moment(startPeriod).isSame(moment(startEnd))) {
            return true;
        }

        return false;
    }

    let isNonNumeric = (numValue) => {
        
        if(isNaN(numValue)) {
            return true
        }
        return false;
    }


    function validateAll(entity, payments) {

        let result = {
            key: "",
            isValid: true,
            message: "",
            error(value, key) {
                this.key = key;
                this.isValid = false;
                this.message = value;
            },
            ok() {
                this.message = "";
                this.isValid = true;
                this.key = "";
            }
        };

        //check required
        let req = isEmpty(entity, 'payment_no', 'bank', 'amount');
        if (req) {
            result.error("field is required", req);
            return result;
        }
        
        if(isNonNumeric(entity.amount)) {
            result.error("Amount must be numeric", "amount");
            return result;
        }

        if (payments.length > 0 && entity.payment_type.toLowerCase() === 'cheque') {
            //check duplicate cheque no
            if (duplicateOrEmpty(entity, payments, 'payment_no')) {
                result.error("Duplicate cheque no", "payment_no");
                return result;
            }
        }

        //check if valid date
        let vdate = validateDate(entity, 'created_at', 'period_start', 'period_end');
        if (vdate.length > 0) {
            result.error("Date must be valid date", vdate);
            return result;
        }

        if(dateRangePeriod(entity.period_start,entity.period_end)) {
            result.error("Start should be later thant End date", "period_start");
            return result;
        }



        return result;
    }

    return {
        validateAll: validateAll
    }
}