import sCode from "../../custom/status-codes";
const { ok, server_error } = sCode;

// import {
//     getIdNotFoundCommonMsg,
// } from '../../custom/error-msg';

// models import here
import model from '../../db/models';
const { Banner } = model;

export default {
    async getBanners(req, res) {
        try {
            let banners = [];
            banners = await Banner.getAllList();            
            res.status(ok).send({ banners });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },
    
}