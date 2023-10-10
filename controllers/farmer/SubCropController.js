import sCode from "../../custom/status-codes";
const { ok, created, bad_request, server_error } = sCode;

import {
    getIdNotFoundCommonMsg,
} from '../../custom/error-msg';

// models import here
import model from '../../db/models';
const { SubCrop, Crop } = model;

export default {
    async getAllSubCrop(req, res) {
        try {
            let sub_crops = [];
            sub_crops = await SubCrop.getAllListCrop();            
            res.status(ok).send({ sub_crops });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async getSubCrops(req, res) {
        try {
            const { id } = req.params;
            const crops = await Crop.getRecordById(id);
            let sub_crops = [];
            sub_crops = await SubCrop.getAllList(id);            
            res.status(ok).send({ sub_crops, crops });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async getSubCrop(req, res) {
        try {
            const { id } = req.params;
            const recordExist = await SubCrop.getRecordById(id);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('sub_crop') });
            res.status(ok).send({ sub_crop: recordExist });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    
}