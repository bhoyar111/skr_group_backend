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
const { Country, State, City } = model;

// validation import here
import validateCity from '../../requests/cityRequest';

export default {
    async getCitiesDS(req, res) {
        try {
            let countries = [];
            countries = await Country.getDS();
            let states = [];
            states = await State.getDS();
            res.status(ok).send({ countries, states });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async getCities(req, res) {
        try {
            const { pageNo } = req.query;
            const page = checkDataIsValid(pageNo) ? pageNo : 1;
            const pageSize = pageLimit();
            let citiesRes = [];
            citiesRes = await City.getList(page, pageSize);
            const pages = Math.ceil(citiesRes.count / pageSize);

            const pageData = {
                total_record : citiesRes.count,
                per_page     : pageSize,
                current_page : page,
                total_pages  : pages
            }
            const cities = checkDataIsValid(citiesRes.rows) ? citiesRes.rows : [];
            res.status(ok).send({ cities, pageData });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async addCity(req, res) {
        try {
            const { error } = validateCity(req.body);
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });
            const city = await City.saveRecord(req.body);
            if (!city) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(created).send({ city });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async getCity(req, res) {
        try {
            const { id } = req.params;
            const decId = getDecryptId(id);
            const recordExist = await City.getRecordById(decId);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('city') });
            const countries = await Country.getDS();
            const states = await State.getDS();
            res.status(ok).send({ city: recordExist, countries, states });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async updateCity(req, res) {
        try {
            const { error } = validateCity(req.body);
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });

            const { id } = req.params;
            const decId = getDecryptId(id);
            let recordExist = await City.getRecordById(decId);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('city') });

            const city = await City.updateRecord( recordExist, req.body );
            if (!city) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(created).send({ city });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async deleteCity(req, res) {
        try {
            const { id } = req.params;
            const decId = getDecryptId(id);
            let recordExist = await City.getRecordById(decId);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('city') });

            const city = await City.deleteRecord( recordExist );
            if (!city) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(ok).send({ city });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    }
}