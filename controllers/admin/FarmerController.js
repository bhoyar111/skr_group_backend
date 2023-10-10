import sCode from "../../custom/status-codes";
const { ok, created, bad_request, server_error } = sCode;
import { getDecryptId, pageLimit, checkDataIsValid } from '../../custom/secure';

import {
    getValidationErrMsg,
    getIdNotFoundCommonMsg,
    getServerErrorMsg,
    // getIdAssignedMsg
} from '../../custom/error-msg';


// models import here
import model from '../../db/models';
const { Farmer, State, City, SubCrop } = model;

// validation import here
import validateFarmer from '../../requests/farmerRequest';
import validateFarmerCropGrown from '../../requests/farmerCropGrownRequest';

export default {
    async getFarmersDS(req, res) {
        try {
            let states = [];
            states = await State.getDS();
            let cities = [];
            cities = await City.getDS();
            res.status(ok).send({ states, cities });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async getFarmers(req, res) {
        try {
            const { pageNo } = req.query;
            const page = checkDataIsValid(pageNo) ? pageNo : 1;
            const pageSize = pageLimit();

            let farmersRes = [];
            farmersRes = await Farmer.getList(page, pageSize);
            const pages = Math.ceil(farmersRes.count / pageSize);

            const pageData = {
                total_record : farmersRes.count,
                per_page     : pageSize,
                current_page : page,
                total_pages  : pages
            }
            const farmers = checkDataIsValid(farmersRes.rows) ? farmersRes.rows : [];
            res.status(ok).send({ farmers, pageData });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async addFarmer(req, res) {
        try {
            const { error } = validateFarmer(req.body);
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });
            const farmer = await Farmer.saveRecord(req.body);
            if (!farmer) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(created).send({ farmer });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async getFarmer(req, res) {
        try {
            const { id } = req.params;
            const decId = getDecryptId(id);
            const recordExist = await Farmer.getRecordById(decId);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('farmer') });
            const states = await State.getDS();
            const cities = await City.getDS();
            const sub_crops = await SubCrop.getDS();
            res.status(ok).send({ farmer: recordExist, states, cities, sub_crops });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async updateFarmer(req, res) {
        try {
            const { error } = validateFarmer(req.body);
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });

            const { id } = req.params;
            const decId = getDecryptId(id);
            let recordExist = await Farmer.getRecordById(decId);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('farmer') });

            const farmer = await Farmer.updateRecord( recordExist, req.body );
            if (!farmer) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(created).send({ farmer });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async deleteFarmer(req, res) {
        try {
            const { id } = req.params;
            const decId = getDecryptId(id);
            let recordExist = await Farmer.getRecordById(decId);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('farmer') });

            const farmer = await Farmer.deleteRecord( recordExist );
            if (!farmer) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(ok).send({ farmer });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    // Farmer Crop Grown
    async updateFarmerCropGrown(req, res) {
        try {
            const { error } = validateFarmerCropGrown(req.body);
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });

            const { id } = req.params;
            const decId = getDecryptId(id);
            let recordExist = await Farmer.getRecordById(decId);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('farmer') });

            const farmer = await Farmer.updateFCGRecord( recordExist, req.body );
            if (!farmer) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(created).send({ farmer });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },
}