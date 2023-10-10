import sCode from "../../custom/status-codes";
const { ok, created, bad_request, server_error } = sCode;
import { getDecryptId, pageLimit, checkDataIsValid, moveFileFunction } from '../../custom/secure';

import {
    getValidationErrMsg,
    getIdNotFoundCommonMsg,
    getServerErrorMsg,
    // getIdAssignedMsg
} from '../../custom/error-msg';

// models import here
import model from '../../db/models';
const { Farmer, AskTheExpert } = model;

// validation import here
import validateAskExpert from '../../requests/askexpertRequest';

export default {
    async getAskExpertDS(req, res) {
        try {
            let farmers = [];
            farmers = await Farmer.getDS();
            res.status(ok).send({ farmers });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async getAskExperts(req, res) {
        try {
            const { pageNo } = req.query;
            const page = checkDataIsValid(pageNo) ? pageNo : 1;
            const pageSize = pageLimit();

            let asktheexpertsRes = [];
            asktheexpertsRes = await AskTheExpert.getList(page, pageSize);
            const pages = Math.ceil(asktheexpertsRes.count / pageSize);

            const pageData = {
                total_record : asktheexpertsRes.count,
                per_page     : pageSize,
                current_page : page,
                total_pages  : pages
            }
            const akstheexperts = checkDataIsValid(asktheexpertsRes.rows) ? asktheexpertsRes.rows : [];
            res.status(ok).send({ akstheexperts, pageData });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async addAskExpert(req, res) {
        try {
            const { error } = validateAskExpert(req.body);
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });
            //  image upload code starts
            let doc_url = "";
            if (req.files) {
                const uploadLocation = 'public/ask_the_expert/';
                const { message, up_file_path } = await moveFileFunction(req.files.doc_url, `./${uploadLocation}`);
                if (message) return  res.status(server_error).send({ message });
                if(!checkDataIsValid(up_file_path)) res.status(server_error).send({ message: getServerErrorMsg() });
                doc_url = up_file_path;
            }
            const sData = req.body;
            const asktheexpert = await AskTheExpert.saveRecord({...sData, doc_url});
            if (!asktheexpert) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(created).send({ asktheexpert });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async getAskExpert(req, res) {
        try {
            const { id } = req.params;
            const decId = getDecryptId(id);
            const recordExist = await AskTheExpert.getRecordById(decId);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('asktheexpert') });
            const farmers = await Farmer.getDS();
            res.status(ok).send({ asktheexpert: recordExist, farmers });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async updateAskExpert(req, res) {
        try {
            const { error } = validateAskExpert(req.body);
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });

            const { id } = req.params;
            const decId = getDecryptId(id);
            let recordExist = await AskTheExpert.getRecordById(decId);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('asktheexpert') });
             //  image upload code starts
            let doc_url = "";
            if (req.files) {
                const uploadLocation = 'public/ask_the_expert/';
                const { message, up_file_path } = await moveFileFunction(req.files.doc_url, `./${uploadLocation}`);
                if (message) return  res.status(server_error).send({ message });
                if(!checkDataIsValid(up_file_path)) res.status(server_error).send({ message: getServerErrorMsg() });
                doc_url = up_file_path;
            }

            const asktheexpert = await AskTheExpert.updateRecord( recordExist, req.body );
            if (!asktheexpert) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(created).send({ asktheexpert });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async deleteAskExpert(req, res) {
        try {
            const { id } = req.params;
            const decId = getDecryptId(id);
            let recordExist = await AskTheExpert.getRecordById(decId);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('asktheexpert') });

            const asktheexpert = await AskTheExpert.deleteRecord( recordExist );
            if (!asktheexpert) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(ok).send({ asktheexpert });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    }
}