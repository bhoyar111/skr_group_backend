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
const { SubCrop, Crop, Stage } = model;

// validation import here
import validateSubCrop from '../../requests/subCropRequest';

export default {
    async getSubCropsDS(req, res) {
        try {
            let crops = [];
            crops = await Crop.getDS();
            res.status(ok).send({ crops });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async getSubCrops(req, res) {
        try {
            const { pageNo } = req.query;
            const page = checkDataIsValid(pageNo) ? pageNo : 1;
            const pageSize = pageLimit();

            let sub_cropsRes = [];
            sub_cropsRes = await SubCrop.getList(page, pageSize);
            const pages = Math.ceil(sub_cropsRes.count / pageSize);

            const pageData = {
                total_record : sub_cropsRes.count,
                per_page     : pageSize,
                current_page : page,
                total_pages  : pages
            }
            const sub_crops = checkDataIsValid(sub_cropsRes.rows) ? sub_cropsRes.rows : [];
            res.status(ok).send({ sub_crops, pageData });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async addSubCrop(req, res) {
        try {
            const { error } = validateSubCrop(req.body);
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });
            // image upload code starts
            let sub_crop_img = "";
            if (req.files) {
                const uploadLocation = 'public/subcrop/';
                const { message, up_file_path } = await moveFileFunction(req.files.sub_crop_img, `./${uploadLocation}`);
                if (message) return  res.status(server_error).send({ message });
                if(!checkDataIsValid(up_file_path)) res.status(server_error).send({ message: getServerErrorMsg() });
                sub_crop_img = up_file_path;
            }
            const sData = req.body;
            const sub_crop = await SubCrop.saveRecord({...sData, sub_crop_img});

            // stages generated
            if(sub_crop){
                const { id } = sub_crop;
                const stageSaveData = {
                    sub_crop_id : id,
                    stage_name  : "Fertilizer Management",
                    have_sub_stage: "yes",
                    description : "Fertilizer Management",
                    doc_url     : "stage/1625295307059.png"
                }
                await Stage.saveRecord(stageSaveData);
                
                const stageSaveData1 = {
                    sub_crop_id : id,
                    stage_name  : "Pest and Disease Management",
                    have_sub_stage: "yes",
                    description : "Pest and Disease Management",
                    doc_url     : "stage/1625295259984.png"
                }
                await Stage.saveRecord(stageSaveData1);
            }

            if (!sub_crop) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(created).send({ sub_crop });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async getSubCrop(req, res) {
        try {
            const { id } = req.params;
            const decId = getDecryptId(id);
            const recordExist = await SubCrop.getRecordById(decId);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('sub_crop') });
            const crops = await Crop.getDS();
            res.status(ok).send({ sub_crop: recordExist, crops });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async updateSubCrop(req, res) {
        try {
            const { error } = validateSubCrop(req.body);
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });
            const { id } = req.params;
            const decId = getDecryptId(id);
            let recordExist = await SubCrop.getRecordById(decId);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('sub_crop') });
            // image upload code starts
            if (req.files) {
                const uploadLocation = 'public/subcrop/';
                const { message, up_file_path } = await moveFileFunction(req.files.sub_crop_img, `./${uploadLocation}`);
                if (message) return  res.status(server_error).send({ message });
                if(!checkDataIsValid(up_file_path)) res.status(server_error).send({ message: getServerErrorMsg() });
                req.body.sub_crop_img = up_file_path;
            }

            const sub_crop = await SubCrop.updateRecord( recordExist, req.body );
            if (!sub_crop) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(created).send({ sub_crop });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async deleteSubCrop(req, res) {
        try {
            const { id } = req.params;
            const decId = getDecryptId(id);
            let recordExist = await SubCrop.getRecordById(decId);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('sub_crop') });

            const sub_crop = await SubCrop.deleteRecord( recordExist );
            if (!sub_crop) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(ok).send({ sub_crop });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    }
}