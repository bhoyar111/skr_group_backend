import sCode from "../../custom/status-codes";
const { ok, created, bad_request, server_error } = sCode;

import {
    getValidationErrMsg,
    getIdNotFoundCommonMsg,
    getServerErrorMsg,
    // getIdAssignedMsg
} from '../../custom/error-msg';

// models import here
import model from '../../db/models';
const { Community } = model;

// validation import here
import validateCommunity from '../../requests/communityRequet';

export default {
    async getCommunities(req, res) {
        try {
            let communities = [];
            communities = await Community.getList();
            res.status(ok).send({ communities });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async addCommunity(req, res) {
        try {
            const { error } = validateCommunity(req.body);
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });
            const community = await Community.saveRecord(req.body);
            if (!community) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(created).send({ community });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async getCommunity(req, res) {
        try {
            const { id } = req.params;
            const recordExist = await Community.getRecordById(id);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('community') });
            res.status(ok).send({ community: recordExist });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async updateCommunity(req, res) {
        try {
            const { error } = validateCommunity(req.body);
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });

            const { id } = req.params;
            let recordExist = await Community.getRecordById(id);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('community') });

            const community = await Community.updateRecord( recordExist, req.body );
            if (!community) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(created).send({ community });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async deleteCommunity(req, res) {
        try {
            const { id } = req.params;
            let recordExist = await Community.getRecordById(id);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('community') });

            const community = await Community.deleteRecord( recordExist );
            if (!community) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(ok).send({ community });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    }
}