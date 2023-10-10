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
const { Stage, SubCrop } = model;

// validation import here
import validateStage from '../../requests/stageRequest';

export default {
    async getStagesDS(req, res) {
        try {
            let sub_crops = [];
            sub_crops = await SubCrop.getDS();
            res.status(ok).send({ sub_crops });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async getStages(req, res) {
        try {
            
            const { pageNo } = req.query;
            const page = checkDataIsValid(pageNo) ? pageNo : 1;
            const pageSize = pageLimit();

            const { id } = req.params;
            const decId = getDecryptId(id);
            const sub_crops = await SubCrop.getRecordById(decId);

            let stageRes = [];
            stageRes = await Stage.getList(page, pageSize, decId);
            const pages = Math.ceil(stageRes.count / pageSize);

            const pageData = {
                total_record : stageRes.count,
                per_page     : pageSize,
                current_page : page,
                total_pages  : pages
            }
            const stages = checkDataIsValid(stageRes.rows) ? stageRes.rows : [];
            res.status(ok).send({ stages, sub_crops, pageData });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async addStage(req, res) {
        try {
            const { error } = validateStage(req.body);
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });
             // image upload code starts
             let doc_url = "";
             if (req.files) {
                 const uploadLocation = 'public/stage/';
                 const { message, up_file_path } = await moveFileFunction(req.files.doc_url, `./${uploadLocation}`);
                 if (message) return  res.status(server_error).send({ message });
                 if(!checkDataIsValid(up_file_path)) res.status(server_error).send({ message: getServerErrorMsg() });
                 doc_url = up_file_path;
             }
             const sData = req.body;

            const stage = await Stage.saveRecord({...sData, doc_url });
            if (!stage) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(created).send({ stage });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async getStage(req, res) {
        try {
            const { id } = req.params;
            const decId = getDecryptId(id);
            const recordExist = await Stage.getRecordById(decId);
            const sub_crops = await SubCrop.getDS();
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('stage') });
            res.status(ok).send({ stage: recordExist, sub_crops });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async updateStage(req, res) {
        try {
            const { error } = validateStage(req.body);
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });

            const { id } = req.params;
            const decId = getDecryptId(id);
            let recordExist = await Stage.getRecordById(decId);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('stage') });
            // image upload code starts
            if (req.files) {
                const uploadLocation = 'public/stage/';
                const { message, up_file_path } = await moveFileFunction(req.files.doc_url, `./${uploadLocation}`);
                if (message) return  res.status(server_error).send({ message });
                if(!checkDataIsValid(up_file_path)) res.status(server_error).send({ message: getServerErrorMsg() });
                req.body.doc_url = up_file_path;
            }

            const stage = await Stage.updateRecord( recordExist, req.body );
            if (!stage) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(created).send({ stage });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async deleteStage(req, res) {
        try {
            const { id } = req.params;
            const decId = getDecryptId(id);
            let recordExist = await Stage.getRecordById(decId);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('stage') });

            const stage = await Stage.deleteRecord( recordExist );
            if (!stage) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(ok).send({ stage });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

      // For Ck editor Img Upload
      async ckEditorStage(req, res) {
        try {            
            let result = {
                uploaded: false,
                url: ''
            }

            if (req.files) {
                const uploadLocation = 'public/ck_stage/';
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