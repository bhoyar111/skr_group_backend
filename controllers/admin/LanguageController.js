import sCode from "../../custom/status-codes";
const { ok, created, bad_request, server_error } = sCode;

import {
    getValidationErrMsg,
    getIdNotFoundCommonMsg,
    getServerErrorMsg,
    // getIdAssignedMsg
} from '../../custom/error-msg';

// import { getDecryptId, pageLimit } from '../../custom/secure';

// models import here
import model from '../../db/models';
const { Language } = model;

// validation import here
import validateLanguage from '../../requests/languageRequet';

export default {
    async getLanguages(req, res) {
        try {
            let langauges = [];
            langauges = await Language.getList();
            res.status(ok).send({ langauges });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async addLanguage(req, res) {
        try {
            const { error } = validateLanguage(req.body);
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });
            const language = await Language.saveRecord(req.body);
            if (!language) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(created).send({ language });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async getLanguage(req, res) {
        try {
            const { id } = req.params;
            // const decId = getDecryptId(id);
            const recordExist = await Language.getRecordById(id);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('language') });
            res.status(ok).send({ language: recordExist });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async updateLanguage(req, res) {
        try {
            const { error } = validateLanguage(req.body);
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });

            const { id } = req.params;
            // const decId = getDecryptId(id);
            let recordExist = await Language.getRecordById(id);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('language') });

            const language = await Language.updateRecord( recordExist, req.body );
            if (!language) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(created).send({ language });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async deleteLanguage(req, res) {
        try {
            const { id } = req.params;
            // const decId = getDecryptId(id);
            let recordExist = await Language.getRecordById(id);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('language') });

            const language = await Language.deleteRecord( recordExist );
            if (!language) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(ok).send({ language });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    }
}