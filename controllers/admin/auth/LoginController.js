import sCode from "../../../custom/status-codes";
const { ok, bad_request, un_authorized, server_error, created } = sCode;

import { getValidationErrMsg } from '../../../custom/error-msg';
import { validateRefreshToken } from '../../../custom/secure'

// models import here
import model from '../../../db/models';
const { User, UserRefreshToken } = model;

// validation import here
import validateLogin from '../../../requests/loginRequest';

export default {
    async getLogin(req, res) {
        try {
            const { error } = validateLogin(req.body);
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });

            const user = await User.getUser(req.body, model);
            if (!user) return res.status(bad_request).send({ error: { email_id: "Email does't exists."} });

            if (!User.validatePassword(req.body.password, user.password)) return res.status(un_authorized).send({ error: { password: "Incorrect Password"} });

            const { id, email_id, first_name, last_name, role_id, mobile_no } = user;
            const userSerialize = { id, email_id, first_name, last_name, role_id, mobile_no };
            const token = User.generateTokens(userSerialize);

            // create data for current user in refresh token table
            const tokenSave = await UserRefreshToken.saveUserAndTokenData(user, token);
            if(!tokenSave) return res.status(server_error).send({ message: 'Internal Server Error' });

            Object.assign(token, { user_refresh_token_id: tokenSave.id });
            res.status(ok).send({ user, token });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async getLogout(req, res) {
        try {
            const {refresh_token, user_refresh_token_id} = req.body;
            if (!refresh_token) return res.status(un_authorized).send({ message: 'Refresh token not found' });
            if (!user_refresh_token_id) return res.status(un_authorized).send({ message: 'Refresh token Id not found' });
            await UserRefreshToken.removeUserToken(req.body);
            res.status(ok).send({ message: "logout successfully" });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async getToken(req, res) {
        try {
            const { refresh_token, user_refresh_token_id } = req.body;
            if (!refresh_token) return res.status(un_authorized).send({error: 'Refresh token not found'});
            if (!user_refresh_token_id) return res.status(un_authorized).send({error: 'Refresh token id not found'});

            const checkCond = { id: user_refresh_token_id, refresh_token };
            const refreshTokenExist = await UserRefreshToken.checkUserToken(checkCond);
            if (!refreshTokenExist) return res.status(un_authorized).send({ error: 'Refresh token not exist' });

            const accessToken = validateRefreshToken(refresh_token);
            if (accessToken === false) return res.status(forbidden).send({ error: 'Refresh token not verified' });
            return res.status(created).send({ status: true, accessToken: accessToken });
        } catch (e) {
            console.log(e);
            return res.status(server_error).send(e);
        }
    },

};