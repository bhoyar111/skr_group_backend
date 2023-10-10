import sCode from "../../custom/status-codes";
const { ok, created, bad_request, server_error } = sCode;
import { getDecryptId, pageLimit, checkDataIsValid } from '../../custom/secure';

import {
    getValidationErrMsg,
    getIdNotFoundCommonMsg,
    getServerErrorMsg,
    // getIdAssignedMsg
} from '../../custom/error-msg';

// models import here
import model from '../../db/models';
const { SubCrop, Video } = model;

// validation import here
import validateVideo from '../../requests/videoRequest';

export default {
    async getVideosDS(req, res) {
        try {
            let sub_crops = [];
            sub_crops = await SubCrop.getDS();
            res.status(ok).send({ sub_crops });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async getVideos(req, res) {
        try {
            const { pageNo } = req.query;
            const page = checkDataIsValid(pageNo) ? pageNo : 1;
            const pageSize = pageLimit();

            let videosRes = [];
            videosRes = await Video.getList(page, pageSize);
            const pages = Math.ceil(videosRes.count / pageSize);

            const pageData = {
                total_record : videosRes.count,
                per_page     : pageSize,
                current_page : page,
                total_pages  : pages
            }
            const videos = checkDataIsValid(videosRes.rows) ? videosRes.rows : [];
            res.status(ok).send({ videos, pageData });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async addVideo(req, res) {
        try {
            const { error } = validateVideo(req.body);
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });
            const video = await Video.saveRecord(req.body);
            if (!video) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(created).send({ video });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async getVideo(req, res) {
        try {
            const { id } = req.params;
            const decId = getDecryptId(id);
            const recordExist = await Video.getRecordById(decId);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('video') });
            const sub_crops = await SubCrop.getDS();
            res.status(ok).send({ video: recordExist, sub_crops });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async updateVideo(req, res) {
        try {
            const { error } = validateVideo(req.body);
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });

            const { id } = req.params;
            const decId = getDecryptId(id);
            let recordExist = await Video.getRecordById(decId);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('video') });

            const video = await Video.updateRecord( recordExist, req.body );
            if (!video) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(created).send({ video });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async deleteVideo(req, res) {
        try {
            const { id } = req.params;
            const decId = getDecryptId(id);
            let recordExist = await Video.getRecordById(decId);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('video') });

            const video = await Video.deleteRecord( recordExist );
            if (!video) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(ok).send({ video });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    }
}