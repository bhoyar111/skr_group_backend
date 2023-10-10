import sCode from "../../custom/status-codes";
const { ok, server_error } = sCode;

// import {
//     getIdNotFoundCommonMsg,
// } from '../../custom/error-msg';

// models import here
import model from '../../db/models';
const { Video } = model;

export default {
    async getVideos(req, res) {
        try {
            let videos = [];
            videos = await Video.getAllList();            
            res.status(ok).send({ videos });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },
    
}