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
const { Crop } = model;

// validation import here
import validateCrop from '../../requests/cropRequest';

export default {
    async getCropsDS(req, res) {
        try {
            let crops = [];
            crops = await Crop.getDS();
            res.status(ok).send({ crops });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async getCrops(req, res) {
        try {
            const { pageNo } = req.query;
            const page = checkDataIsValid(pageNo) ? pageNo : 1;
            const pageSize = pageLimit();

            let cropsRes = [];
            cropsRes = await Crop.getList(page, pageSize);
            const pages = Math.ceil(cropsRes.count / pageSize);

            const pageData = {
                total_record : cropsRes.count,
                per_page     : pageSize,
                current_page : page,
                total_pages  : pages
            }
            const crops = checkDataIsValid(cropsRes.rows) ? cropsRes.rows : [];
            res.status(ok).send({ crops, pageData });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async addCrop(req, res) {
        try {
            const { error } = validateCrop(req.body);
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });
            // image upload code starts
            let crop_img = "";
            if (req.files) {
                const uploadLocation = 'public/crop/';
                const { message, up_file_path } = await moveFileFunction(req.files.crop_img, `./${uploadLocation}`);
                if (message) return  res.status(server_error).send({ message });
                if(!checkDataIsValid(up_file_path)) res.status(server_error).send({ message: getServerErrorMsg() });
                crop_img = up_file_path;
            }
            const sData = req.body;
            const crop = await Crop.saveRecord({...sData, crop_img });
            if (!crop) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(created).send({ crop });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async getCrop(req, res) {
        try {
            const { id } = req.params;
            const decId = getDecryptId(id);
            const recordExist = await Crop.getRecordById(decId);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('crop') });
            res.status(ok).send({ crop: recordExist });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async updateCrop(req, res) {
        try {
            const { error } = validateCrop(req.body);
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });
            
            const { id } = req.params;
            const decId = getDecryptId(id);
            let recordExist = await Crop.getRecordById(decId);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('crop') });
             // image upload code starts
            // let crop_img = recordExist.crop_img;
             if (req.files) {
                const uploadLocation = 'public/crop/';
                const { message, up_file_path } = await moveFileFunction(req.files.crop_img, `./${uploadLocation}`);
                if (message) return  res.status(server_error).send({ message });
                if(!checkDataIsValid(up_file_path)) res.status(server_error).send({ message: getServerErrorMsg() });
                req.body.crop_img = up_file_path;
             }

            const crop = await Crop.updateRecord( recordExist, req.body );
            if (!crop) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(created).send({ crop });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async deleteCrop(req, res) {
        try {
            const { id } = req.params;
            const decId = getDecryptId(id);
            let recordExist = await Crop.getRecordById(decId);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('crop') });

            const crop = await Crop.deleteRecord( recordExist );
            if (!crop) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(ok).send({ crop });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    }
}