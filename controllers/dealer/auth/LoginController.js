import sCode from "../../../custom/status-codes";
const { ok, bad_request, un_authorized, server_error } = sCode;

import { getValidationErrMsg } from '../../../custom/error-msg';

// models import here
import model from '../../../db/models';
const { Dealer, dealerRefreshToken } = model;

// validation import here
import validateLogin from '../../../requests/dealerLoginRequest';

export default {
    async getLogin(req, res) {
        try {
            const { error } = validateLogin(req.body);
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });

            const dealer = await Dealer.getUser(req.body, model);
            if (!dealer) return res.status(bad_request).send({ error: { email_id: "Email does't exists."} });

            if (!Dealer.validatePassword(req.body.password, dealer.password)) return res.status(un_authorized).send({ error: { password: "Incorrect Password"} });

            const { id, email_id, dealer_name, mobile_no } = dealer;
            const userSerialize = { id, email_id, dealer_name, mobile_no };
            const token = Dealer.generateTokens(userSerialize);

            // create data for current user in refresh token table
            const tokenSave = await dealerRefreshToken.saveUserAndTokenData(dealer, token);
            if(!tokenSave) return res.status(server_error).send({ message: 'Internal Server Error' });

            Object.assign(token, { dealer_refresh_token_id: tokenSave.id });
            res.status(ok).send({ dealer, token });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async getLogout(req, res) {
        try {
            const {refresh_token, dealer_refresh_token_id} = req.body;
            if (!refresh_token) return res.status(un_authorized).send({ message: 'Refresh token not found' });
            if (!dealer_refresh_token_id) return res.status(un_authorized).send({ message: 'Refresh token Id not found' });
            await dealerRefreshToken.removeUserToken(req.body);
            res.status(ok).send({ message: "logout successfully" });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    }
};