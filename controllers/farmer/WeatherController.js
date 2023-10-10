import sCode from "../../custom/status-codes";
const { ok, bad_request, server_error } = sCode;
import { weatherService } from '../../custom/weatherService';

import {
    getValidationErrMsg,
    getServerErrorMsg,
} from '../../custom/error-msg';

// validation import here
import validateWeather from '../../requests/latlonRequest';

export default {
    async getWeather(req, res) {
        try {
            const { error } = validateWeather(req.body);
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });
            const weather = await weatherService(req.body);
            const { status, data, message } = weather;
            if (!status) return res.status(bad_request).send({ error: { lon: message } });
            res.status(ok).send({ data });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

}