import sCode from "../../custom/status-codes";
const { ok, created, bad_request, server_error } = sCode;

import {
    getIdNotFoundCommonMsg,
} from '../../custom/error-msg';

// models import here
import model from '../../db/models';
const { StageInformation, Stage } = model;

export default {

    async getStageInformations(req, res) {
        try {
            const { id } = req.params;
            const stages = await Stage.getRecordById(id);
            let stage_informations = [];
            stage_informations = await StageInformation.getAllList(id);            
            res.status(ok).send({ stage_informations, stages });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async getStageInformation(req, res) {
        try {
            const { id } = req.params;
            const recordExist = await StageInformation.getRecordById(id);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('stage_information') });
            res.status(ok).send({ stage_information: recordExist });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    
}