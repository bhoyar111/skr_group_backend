import sCode from "../../custom/status-codes";
const { ok, created, bad_request, server_error } = sCode;
import { getDecryptId, pageLimit, checkDataIsValid } from '../../custom/secure';
import { Permissions } from '../../custom/permissions';

import {
    getValidationErrMsg,
    getIdNotFoundCommonMsg,
    getServerErrorMsg,
    getIdAssignedMsg
} from '../../custom/error-msg';

// models import here
import model from '../../db/models';
const { Role } = model;

// validation import here
import validateRole from '../../requests/roleRequest';

export default {
    async getRoles(req, res) {
        try {
            const { pageNo } = req.query;
            const page = checkDataIsValid(pageNo) ? pageNo : 1;
            const pageSize = pageLimit();

            let rolesRes = [];
            rolesRes = await Role.getList(page, pageSize);
            const pages = Math.ceil(rolesRes.count / pageSize);

            const pageData = {
                total_record : rolesRes.count,
                per_page     : pageSize,
                current_page : page,
                total_pages  : pages
            }
            const roles = checkDataIsValid(rolesRes.rows) ? rolesRes.rows : [];
            res.status(ok).send({ roles, pageData });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async addRole(req, res) {
        try {
            const { error } = validateRole(req.body);
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });
            const role = await Role.saveRecord(req.body);
            if (!role) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(created).send({ role });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async getRole(req, res) {
        try {
            const { id } = req.params;
            const decId = getDecryptId(id);
            const recordExist = await Role.getRecordById(decId);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('role') });
            res.status(ok).send({ role: recordExist });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async updateRole(req, res) {
        try {
            const { error } = validateRole(req.body);
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });

            const { id } = req.params;
            const decId = getDecryptId(id);
            let recordExist = await Role.getRecordById(decId);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('role') });

            const role = await Role.updateRecord( recordExist, req.body );
            if (!role) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(created).send({ role });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async deleteRole(req, res) {
        try {
            const { id } = req.params;
            const decId = getDecryptId(id);
            let recordExist = await Role.getRecordById(decId);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('role') });

            const checkUsage = await Role.checkUsage(decId);
            if (checkUsage) return res.status(bad_request).send({ message: getIdAssignedMsg('role') });

            const role = await Role.deleteRecord( recordExist );
            if (!role) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(ok).send({ role });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async getModules(req, res) {
        try {
            const modules = Permissions();
            res.status(sCode.ok).send({ modules });
        } catch (e) {
            console.log(e);
            res.status(sCode.server_error).send(e);
        }
    },
}