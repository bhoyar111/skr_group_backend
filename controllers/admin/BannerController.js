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
const { Banner } = model;

// validation import here
import validateBanner from '../../requests/bannerRequest';

export default {
    async getBanners(req, res) {
        try {
            const { pageNo } = req.query;
            const page = checkDataIsValid(pageNo) ? pageNo : 1;
            const pageSize = pageLimit();

            let bannerRes = [];
            bannerRes = await Banner.getList(page, pageSize);
            const pages = Math.ceil(bannerRes.count / pageSize);

            const pageData = {
                total_record : bannerRes.count,
                per_page     : pageSize,
                current_page : page,
                total_pages  : pages
            }
            const banners = checkDataIsValid(bannerRes.rows) ? bannerRes.rows : [];
            res.status(ok).send({ banners, pageData });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async addBanner(req, res) {
        try {
            const { error } = validateBanner(req.body);
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });
            //  image upload code starts
            let banner_img = "";
            if (req.files) {
                const uploadLocation = 'public/banner/';
                const { message, up_file_path } = await moveFileFunction(req.files.banner_img, `./${uploadLocation}`);
                if (message) return  res.status(server_error).send({ message });
                if(!checkDataIsValid(up_file_path)) res.status(server_error).send({ message: getServerErrorMsg() });
                banner_img = up_file_path;
            }
            const sData = req.body;
            const banner = await Banner.saveRecord({...sData, banner_img });
            if (!banner) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(created).send({ banner });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async getBanner(req, res) {
        try {
            const { id } = req.params;
            const decId = getDecryptId(id);
            const recordExist = await Banner.getRecordById(decId);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('banner') });
            res.status(ok).send({ banner: recordExist });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async updateBanner(req, res) {
        try {
            const { error } = validateBanner(req.body);
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });
            
            const { id } = req.params;
            const decId = getDecryptId(id);
            let recordExist = await Banner.getRecordById(decId);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('banner') });
             //  image upload code starts
             if (req.files) {
                const uploadLocation = 'public/banner/';
                const { message, up_file_path } = await moveFileFunction(req.files.banner_img, `./${uploadLocation}`);
                if (message) return  res.status(server_error).send({ message });
                if(!checkDataIsValid(up_file_path)) res.status(server_error).send({ message: getServerErrorMsg() });
                req.body.banner_img = up_file_path;
             }
             
            const banner = await Banner.updateRecord( recordExist, req.body );
            if (!banner) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(created).send({ banner });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async deleteBanner(req, res) {
        try {
            const { id } = req.params;
            const decId = getDecryptId(id);
            let recordExist = await Banner.getRecordById(decId);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('banner') });

            const banner = await Banner.deleteRecord( recordExist );
            if (!banner) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(ok).send({ banner });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    }
}