import sCode from "../../custom/status-codes";
const { ok, created, bad_request, server_error } = sCode;

// models import here
import model from '../../db/models';
const { Stage, SubCrop } = model;

export default {


    async getStages(req, res) {
        try {
            const { id } = req.params;
            const sub_crops = await SubCrop.getRecordById(id);
            let stages = [];
            stages = await Stage.getAllList(id);            
            res.status(ok).send({ stages, sub_crops });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async getStage(req, res) {
        try {
            const { id } = req.params;
            const recordExist = await Stage.getRecordById(id);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('stage') });
            res.status(ok).send({ stage: recordExist });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    }

    
}