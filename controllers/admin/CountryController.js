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
const { Country } = model;

// validation import here
import validateCountry from '../../requests/countryRequest';

export default {
    async getCountries(req, res) {
        try {
            const { pageNo } = req.query;
            const page = checkDataIsValid(pageNo) ? pageNo : 1;
            const pageSize = pageLimit();

            let countriesRes = [];
            countriesRes = await Country.getList(page, pageSize);
            const pages = Math.ceil(countriesRes.count / pageSize);

            const pageData = {
                total_record : countriesRes.count,
                per_page     : pageSize,
                current_page : page,
                total_pages  : pages
            }
            const countries = checkDataIsValid(countriesRes.rows) ? countriesRes.rows : [];
            res.status(ok).send({ countries, pageData });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async addCountry(req, res) {
        try {
            const { error } = validateCountry(req.body);
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });
            const country = await Country.saveRecord(req.body);
            if (!country) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(created).send({ country });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async getCountry(req, res) {
        try {
            const { id } = req.params;
            const decId = getDecryptId(id);
            const recordExist = await Country.getRecordById(decId);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('country') });
            res.status(ok).send({ country: recordExist });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async updateCountry(req, res) {
        try {
            const { error } = validateCountry(req.body);
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });

            const { id } = req.params;
            const decId = getDecryptId(id);
            let recordExist = await Country.getRecordById(decId);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('country') });

            const country = await Country.updateRecord( recordExist, req.body );
            if (!country) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(created).send({ country });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async deleteCountry(req, res) {
        try {
            const { id } = req.params;
            const decId = getDecryptId(id);
            let recordExist = await Country.getRecordById(decId);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('country') });

            const country = await Country.deleteRecord( recordExist );
            if (!country) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(ok).send({ country });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    }
}