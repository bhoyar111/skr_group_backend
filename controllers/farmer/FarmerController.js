import sCode from "../../custom/status-codes";
const { ok, created, bad_request, server_error } = sCode;

import {
    getIdNotFoundCommonMsg,
    getValidationErrMsg,
    getServerErrorMsg,
} from '../../custom/error-msg';

// models import here
import model from '../../db/models';
const { Farmer, State, City } = model;

import validateFarmerCropGrown from '../../requests/farmerCropGrownRequest';
import validateFarmerIrriAc from '../../requests/farmerIrriAcRequest';
import validateFarmerProfile from '../../requests/farmerUpdateProfileRequest';

export default {
    async getFarmer(req, res) {
        try {
            const { id } = req.params;
            const recordExist = await Farmer.getRecordById(id);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('farmer') });
            const states = await State.getDS();
            const cities = await City.getDS();
            res.status(ok).send({ farmer: recordExist, states, cities });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async updateFarmerProfile(req, res) {
        try {
            const { error } = validateFarmerProfile(req.body);
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });

            const { id } = req.params;
            let recordExist = await Farmer.getRecordById(id);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('farmer') });

            const farmer = await Farmer.updateFCGRecord( recordExist, req.body );
            if (!farmer) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(created).send({ farmer });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async updateCropGrown(req, res) {
        try {
            const { error } = validateFarmerCropGrown(req.body);
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });

            const { id } = req.params;
            let recordExist = await Farmer.getFCGRecordById(id);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('farmer') });

            const farmer = await Farmer.updateFCGRecord( recordExist, req.body );
            if (!farmer) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(created).send({ farmer });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async updateIrriAC(req, res) {
        try {
            const { error } = validateFarmerIrriAc(req.body);
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });

            const { id } = req.params;
            let recordExist = await Farmer.getRecordById(id);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('farmer') });

            const farmer = await Farmer.updateRecord( recordExist, req.body );
            if (!farmer) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(created).send({ farmer });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },
}