import sCode from "../../custom/status-codes";
const { ok, created, bad_request, server_error } = sCode;

import { 
    getDecryptId, 
    pageLimit, 
    checkDataIsValid, 
    moveFileFunction 
} from '../../custom/secure';

import {
    getValidationErrMsg,
    getIdNotFoundCommonMsg,
    getServerErrorMsg,
    // getIdAssignedMsg
} from '../../custom/error-msg';

// models import here
import model from '../../db/models';
const { StageInformation, SubCrop, Stage } = model;

// validation import here
import validateStageInfo from '../../requests/stageInfoRequest';

export default {
    async getStageInformationsDS(req, res) {
        try {
            let sub_crops = [];
            sub_crops = await SubCrop.getDS();
            let stages = [];
            stages = await Stage.getDS();
            res.status(ok).send({ sub_crops, stages });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async getStageInformations(req, res) {
        try {
            const { pageNo } = req.query;
            const page = checkDataIsValid(pageNo) ? pageNo : 1;
            const pageSize = pageLimit();

            const { id } = req.params;
            const decId = getDecryptId(id);
            const stages = await Stage.getRecordById(decId);

            let stage_informationsRes = [];
            stage_informationsRes = await StageInformation.getList(page, pageSize, decId);
            const pages = Math.ceil(stage_informationsRes.count / pageSize);

            const pageData = {
                total_record : stage_informationsRes.count,
                per_page     : pageSize,
                current_page : page,
                total_pages  : pages
            }
            const stage_informations = checkDataIsValid(stage_informationsRes.rows) ? stage_informationsRes.rows : [];
            res.status(ok).send({ stage_informations, stages, pageData });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async addStageInformation(req, res) {
        try {
            const { error } = validateStageInfo(req.body);
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });
            // image upload code starts
            let doc_url = "";
            if (req.files) {
                const uploadLocation = 'public/stage_Info/';
                const { message, up_file_path } = await moveFileFunction(req.files.doc_url, `./${uploadLocation}`);
                if (message) return  res.status(server_error).send({ message });
                if(!checkDataIsValid(up_file_path)) res.status(server_error).send({ message: getServerErrorMsg() });
                doc_url = up_file_path;
            }
            const sData = req.body;
            const stage_information = await StageInformation.saveRecord({...sData, doc_url});
            if (!stage_information) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(created).send({ stage_information });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async getStageInformation(req, res) {
        try {
            const { id } = req.params;
            const decId = getDecryptId(id);
            const recordExist = await StageInformation.getRecordById(decId);
            const sub_crops = await SubCrop.getDS();
            const stages = await Stage.getDS();
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('stage_information') });
            res.status(ok).send({ stage_information: recordExist, sub_crops, stages });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async updateStageInformation(req, res) {
        try {
            const { error } = validateStageInfo(req.body);
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });

            const { id } = req.params;
            const decId = getDecryptId(id);
            let recordExist = await StageInformation.getRecordById(decId);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('stage_information') });
            // image upload code starts
            if (req.files) {
                const uploadLocation = 'public/stage_Info/';
                const { message, up_file_path } = await moveFileFunction(req.files.doc_url, `./${uploadLocation}`);
                if (message) return  res.status(server_error).send({ message });
                if(!checkDataIsValid(up_file_path)) res.status(server_error).send({ message: getServerErrorMsg() });
                req.body.doc_url = up_file_path;
            }

            const stage_information = await StageInformation.updateRecord( recordExist, req.body );
            if (!stage_information) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(created).send({ stage_information });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async deleteStageInformation(req, res) {
        try {
            const { id } = req.params;
            const decId = getDecryptId(id);
            let recordExist = await StageInformation.getRecordById(decId);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('stage_information') });

            const stage_information = await StageInformation.deleteRecord( recordExist );
            if (!stage_information) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(ok).send({ stage_information });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    // For Ck editor Img Upload
    async ckEditorStageInfo(req, res) {
        try {            
            let result = {
                uploaded: false,
                url: ''
            }

            if (req.files) {
                const uploadLocation = 'public/ck_stage_info/';
                const { message, up_file_path } = await moveFileFunction(req.files.upload, `./${uploadLocation}`);
                if (message) return  res.status(server_error).send({ message });
                if(!checkDataIsValid(up_file_path)) res.status(server_error).send({ message: getServerErrorMsg() });
            
                result.uploaded = true;
                result.url = `${req.protocol}://${req.hostname}:${process.env.PORT}/` + up_file_path;
            }
                     
            res.status(ok).send(result);
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    }
}