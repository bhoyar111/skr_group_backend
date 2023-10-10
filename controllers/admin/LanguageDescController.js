import sCode from "../../custom/status-codes";
const { ok, created, bad_request, server_error } = sCode;

import {
    getValidationErrMsg,
    getIdNotFoundCommonMsg,
    getServerErrorMsg,
    // getIdAssignedMsg
} from '../../custom/error-msg';

// import { getDecryptId, pageLimit } from '../custom/secure';

// models import here
import model from '../../db/models';
const { LanguageDescriptions } = model;

// validation import here
import validateLanguageDesc from '../../requests/languageDescRequet';

export default {
    async getLanguageDescriptions(req, res) {
        try {
            let language_descriptions = [];
            language_descriptions = await LanguageDescriptions.getList(model);
            res.status(ok).send({ language_descriptions });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async addLanguageDescription(req, res) {
        try {
            const { error } = validateLanguageDesc(req.body);
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });
            const language_description = await LanguageDescriptions.saveRecord(req.body);
            if (!language_description) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(created).send({ language_description });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async getLanguageDescription(req, res) {
        try {
            const { id } = req.params;
            // const decId = getDecryptId(id);
            const recordExist = await LanguageDescriptions.getRecordById(id);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('language decs') });
            res.status(ok).send({ language_description: recordExist });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async updateLanguageDescription(req, res) {
        try {
            const { error } = validateLanguageDesc(req.body);
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });

            const { id } = req.params;
            // const decId = getDecryptId(id);
            let recordExist = await LanguageDescriptions.getRecordById(id);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('language decs') });

            const language_description = await LanguageDescriptions.updateRecord( recordExist, req.body );
            if (!language_description) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(created).send({ language_description });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async deleteLanguageDescription(req, res) {
        try {
            const { id } = req.params;
            // const decId = getDecryptId(id);
            let recordExist = await LanguageDescriptions.getRecordById(id);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('language decs') });

            const language_description = await LanguageDescriptions.deleteRecord( recordExist );
            if (!language_description) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(ok).send({ language_description });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    }
}