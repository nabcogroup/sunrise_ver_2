
window._ = require('lodash');

window.bbox = require('bootbox');

window.toastr = require('toastr');

/**
 * Moment Js
 ****************/
import Moment from "moment";
import {extendMoment} from "moment-range";

window.moment = extendMoment(Moment);

try {
    window.$ = window.jQuery = require('jquery');

    require('bootstrap-sass');
    
} catch (e) {}

window.accounting = require('accounting-js');

import { AxiosRequest } from './helpers/helpers';

window.axiosRequest = new AxiosRequest();

