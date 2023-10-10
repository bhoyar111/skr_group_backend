import sCode from "../../custom/status-codes";
const { ok, created, server_error, bad_request } = sCode;
import { checkDataIsValid, moveFileFunction } from '../../custom/secure';

import {
    getValidationErrMsg,
    getServerErrorMsg,
} from '../../custom/error-msg';

// models import here
import model from '../../db/models';
const { AskTheExpert, Farmer } = model;

import validateAskExpert from '../../requests/askexpertRequest';

export default {
    async getAskExpertsDS(req, res) {
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
            let asktheexperts = [];
            asktheexperts = await AskTheExpert.getAllList();            
            res.status(ok).send({ asktheexperts });
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
            const asktheexpert = await AskTheExpert.saveMoRecord({...sData, doc_url});
            if (!asktheexpert) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(created).send({ asktheexpert });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

}