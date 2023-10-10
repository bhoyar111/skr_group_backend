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
const { Dealer, Country, State, City  } = model;

// validation import here
import validateDealer from '../../requests/dealerRequest';

export default {
    async getDealerDS(req, res) {
        try {
            let countries = [];
            countries = await Country.getDS();
            let states = [];
            states = await State.getDS();
            let cities = [];
            cities = await City.getDS();
            res.status(ok).send({ countries, states, cities });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },
    
    async getDealers(req, res) {
        try {
            const { pageNo } = req.query;
            const page = checkDataIsValid(pageNo) ? pageNo : 1;
            const pageSize = pageLimit();

            let dealersRes = [];
            dealersRes = await Dealer.getList(page, pageSize, req.query);
            const pages = Math.ceil(dealersRes.count / pageSize);

            const pageData = {
                total_record : dealersRes.count,
                per_page     : pageSize,
                current_page : page,
                total_pages  : pages
            }
            const dealers = checkDataIsValid(dealersRes.rows) ? dealersRes.rows : [];
            res.status(ok).send({ dealers, pageData });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async addDealer(req, res) {
        try {
            const { error } = validateDealer(req.body);
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });
            //  image upload code starts
            let doc_url = "";
            if (req.files) {
                const uploadLocation = 'public/dealer/';
                const { message, up_file_path } = await moveFileFunction(req.files.doc_url, `./${uploadLocation}`);
                if (message) return  res.status(server_error).send({ message });
                if(!checkDataIsValid(up_file_path)) res.status(server_error).send({ message: getServerErrorMsg() });
                doc_url = up_file_path;
            }
            const sData = req.body;
            const dealer = await Dealer.saveRecord({...sData, doc_url });
            if (!dealer) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(created).send({ dealer });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async getDealer(req, res) {
        try {
            const { id } = req.params;
            const decId = getDecryptId(id);
            const recordExist = await Dealer.getRecordById(decId);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('dealer') });
            const countries = await Country.getDS();
            const states = await State.getDS();
            const cities = await City.getDS();
            res.status(ok).send({ dealer: recordExist, countries, states, cities});
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async updateDealer(req, res) {
        try {
            const { error } = validateDealer(req.body);
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });
            
            const { id } = req.params;
            const decId = getDecryptId(id);
            let recordExist = await Dealer.getRecordById(decId);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('dealer') });
            //  image upload code starts
            if (req.files) {
                const uploadLocation = 'public/dealer/';
                const { message, up_file_path } = await moveFileFunction(req.files.doc_url, `./${uploadLocation}`);
                if (message) return  res.status(server_error).send({ message });
                if(!checkDataIsValid(up_file_path)) res.status(server_error).send({ message: getServerErrorMsg() });
                req.body.doc_url = up_file_path;
            }
            
            const dealer = await Dealer.updateRecord( recordExist, req.body );
            if (!dealer) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(created).send({ dealer });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async deleteDealer(req, res) {
        try {
            const { id } = req.params;
            const decId = getDecryptId(id);
            let recordExist = await Dealer.getRecordById(decId);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('dealer') });

            const dealer = await Dealer.deleteRecord( recordExist );
            if (!dealer) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(ok).send({ dealer });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    // For Excel Import
    async addExcelDealer(req, res) {
        try {
            const { excel_dealer } = req.body;
            await Promise.all(excel_dealer.map((dealer) => {
                dealer.createdAt = new Date();
				dealer.updatedAt = new Date();
            }));
            const dealerCollection = await Dealer.saveRecordExcel(excel_dealer);
            if (!dealerCollection) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(created).send({ dealer: dealerCollection });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },
}
