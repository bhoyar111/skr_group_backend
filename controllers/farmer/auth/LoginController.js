import sCode from "../../../custom/status-codes";
const { ok, bad_request, un_authorized, server_error, created } = sCode;

import { zeroPad, validateRefreshToken } from '../../../custom/secure';

import { getValidationErrMsg } from '../../../custom/error-msg';

// models import here
import model from '../../../db/models';
const { Farmer, FarmerRefreshToken, Coupon } = model;

// validation import here
import validateLogin from '../../../requests/farmerLoginRequest';
import validateVerifyLogin from '../../../requests/verifyLoginRequest';
import validateLoginFarmer from '../../../requests/farmerLoginMobileRequest';
import validateLoginFarmerVerify from '../../../requests/farmerLoginVerifyRequest';

export default {
    async getRegister(req, res){
        // try {
            const { error } = validateLogin(req.body);
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });

            //check mobile no. already register
            const userExist = await Farmer.checkFarmer(req.body);
            if (userExist) return res.status(bad_request).send({ error: { mobile_no: " This mobile no. has been already register."} });

            let farmer = await Farmer.getFarmer(req.body);
            if(!farmer || farmer.status === false ){
                // create new farmer
                farmer = await Farmer.saveRecord(req.body);
                // Generate Coupon Code
                if(farmer){
                    const { id } = farmer;
                    const postFix = Math.floor(1000 + Math.random() * 9000);
                    const couponSaveData = {
                        farmer_id: id,
                        coupon_no: `SKR-${zeroPad(id,2)}-${postFix}`,
                    }
                    await Coupon.saveRecord(couponSaveData);
                }
            }
            // generate and send otp
            const newOtp = 1234;// Math.floor(1000 + Math.random() * 9000);
            const updateData = {
                ...req.body,
                otp: newOtp,
            }

            const otpResponse = await Farmer.updateRecord(farmer, updateData);
            const { mobile_no } = otpResponse;

            res.status(ok).send({ mobile_no });
        // } catch (e) {
        //     console.log(e);
        //     res.status(server_error).send(e);
        // }
    },

    async getVerifyLogin(req, res){
        try {
            const { error } = validateVerifyLogin(req.body);
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });

            const { mobile_no:reqMobileNo, otp:reqOtp } = req.body;
            let farmer = await Farmer.getFarmer({ mobile_no: reqMobileNo });

            if (!farmer) return res.status(bad_request).send({ error: { mobile_no: "Mobile number doesn't match."} });

            if(farmer.otp != reqOtp) return res.status(bad_request).send({ error: { otp: "OTP doesn't match."} });

            await Farmer.updateRecord(farmer, { otp: null });
            
            const { id, full_name, mobile_no } = farmer;
            
            const token = Farmer.generateTokens({ id, full_name, mobile_no });

            // create data for current farmer in refresh token table
            const tokenSave = await FarmerRefreshToken.saveFarmerAndTokenData(farmer, token);
            if(!tokenSave) return res.status(server_error).send({ message: 'Internal Server Error' });
            Object.assign(token, { farmer_refresh_token_id: tokenSave.id });

            const user = {  id, full_name, mobile_no  };
            res.status(ok).send({ user, token });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async getLogout(req, res) {
        try {
            const {refresh_token, farmer_refresh_token_id} = req.body;
            if (!refresh_token) return res.status(un_authorized).send({ message: 'Refresh token not found' });
            if (!farmer_refresh_token_id) return res.status(un_authorized).send({ message: 'Refresh token Id not found' });
            await FarmerRefreshToken.removeFarmerToken(req.body);
            res.status(ok).send({ message: "logout successfully" });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async getTokenFarmer(req, res) {
        try {
            const { refresh_token, farmer_refresh_token_id } = req.body;
            if (!refresh_token) return res.status(un_authorized).send({error: 'Refresh token not found'});
            if (!farmer_refresh_token_id) return res.status(un_authorized).send({error: 'Refresh token id not found'});

            const checkCond = { id: farmer_refresh_token_id, refresh_token };
            const refreshTokenExist = await FarmerRefreshToken.checkUserToken(checkCond);
            if (!refreshTokenExist) return res.status(un_authorized).send({ error: 'Refresh token not exist' });

            const accessToken = validateRefreshToken(refresh_token);
            if (accessToken === false) return res.status(forbidden).send({ error: 'Refresh token not verified' });
            return res.status(created).send({ status: true, accessToken: accessToken });
        } catch (e) {
            console.log(e);
            return res.status(server_error).send(e);
        }
    },

    async getFarmerLogin(req, res){
        try {
            const { error } = validateLoginFarmer(req.body);
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });

            const userExist = await Farmer.checkFarmer(req.body);
            if (!userExist) return res.status(bad_request).send({ error: { mobile_no: "Mobile number not register."} });

            let farmer = await Farmer.getFarmer(req.body);
            if(!farmer || farmer.status === false){
                // create new farmer
                farmer = await Farmer.saveRecord(req.body);
            }
            // generate and send otp
            const newOtp = 1234;// Math.floor(1000 + Math.random() * 9000);
            const updateData = {
                ...req.body,
                otp: newOtp,
            }

            const otpResponse = await Farmer.updateRecord(farmer, updateData);
            const { mobile_no } = otpResponse;

            res.status(ok).send({ mobile_no });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async getFarmerLoginVerify(req, res){
        try {
            const { error } = validateLoginFarmerVerify(req.body);
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });

            const { mobile_no:reqMobileNo, otp:reqOtp } = req.body;
            let farmer = await Farmer.otpGetFarmer({mobile_no:reqMobileNo, });

            if (!farmer) return res.status(bad_request).send({ error: { mobile_no: "Mobile number doesn't match."} });

            if(farmer.otp != reqOtp) return res.status(bad_request).send({ error: { otp: "otp doesn't match."} });

            await Farmer.updateRecord(farmer, { otp: null });
            
            const { id, full_name, mobile_no } = farmer;
            
            const token = Farmer.generateTokens({ id, full_name, mobile_no });

            // create data for current farmer in refresh token table
            const tokenSave = await FarmerRefreshToken.saveFarmerAndTokenData(farmer, token);
            if(!tokenSave) return res.status(server_error).send({ message: 'Internal Server Error' });
            Object.assign(token, { farmer_refresh_token_id: tokenSave.id });

            const user = {  id, full_name, mobile_no  };
            res.status(ok).send({ user, token });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    }
};