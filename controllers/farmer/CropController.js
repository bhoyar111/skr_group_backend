import sCode from "../../custom/status-codes";
const { ok, created, bad_request, server_error } = sCode;

import {
    getIdNotFoundCommonMsg,
} from '../../custom/error-msg';

// models import here
import model from '../../db/models';
const { Crop } = model;

export default {


    async getCrops(req, res) {
        try {
            let crops = [];
            crops = await Crop.getAllList();            
            res.status(ok).send({ crops });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async getCrop(req, res) {
        try {
            const { id } = req.params;
            const recordExist = await Crop.getRecordById(id);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('crop') });
            res.status(ok).send({ crop: recordExist });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    
}