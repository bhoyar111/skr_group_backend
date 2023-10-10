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
const { State, Country } = model;

// validation import here
import validateState from '../../requests/stateRequest';

export default {
    async getStatesDS(req, res) {
        try {
            let countries = [];
            countries = await Country.getDS();
            res.status(ok).send({ countries });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },
    async getStates(req, res) {
        try {
            const { pageNo } = req.query;
            const page = checkDataIsValid(pageNo) ? pageNo : 1;
            const pageSize = pageLimit();

            let statesRes = [];
            statesRes = await State.getList(page, pageSize);
            const pages = Math.ceil(statesRes.count / pageSize);

            const pageData = {
                total_record : statesRes.count,
                per_page     : pageSize,
                current_page : page,
                total_pages  : pages
            }
            const states = checkDataIsValid(statesRes.rows) ? statesRes.rows : [];
            res.status(ok).send({ states, pageData });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async addState(req, res) {
        try {
            const { error } = validateState(req.body);
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });
            const state = await State.saveRecord(req.body);
            if (!state) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(created).send({ state });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async getState(req, res) {
        try {
            const { id } = req.params;
            const decId = getDecryptId(id);
            const recordExist = await State.getRecordById(decId);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('state') });
            const countries = await Country.getDS();
            res.status(ok).send({ state: recordExist, countries });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async updateState(req, res) {
        try {
            const { error } = validateState(req.body);
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });

            const { id } = req.params;
            const decId = getDecryptId(id);
            let recordExist = await State.getRecordById(decId);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('state') });

            const state = await State.updateRecord( recordExist, req.body );
            if (!state) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(created).send({ state });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async deleteState(req, res) {
        try {
            const { id } = req.params;
            const decId = getDecryptId(id);
            let recordExist = await State.getRecordById(decId);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('state') });

            const state = await State.deleteRecord( recordExist );
            if (!state) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(ok).send({ state });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    }
}