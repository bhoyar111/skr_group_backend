import sCode from "../../custom/status-codes";
const { ok, created, bad_request, server_error } = sCode;

import {
    getIdNotFoundCommonMsg,
    getValidationErrMsg,
    getServerErrorMsg
} from '../../custom/error-msg';

import validateLatLon from '../../requests/latlonRequest';

// models import here
import model from '../../db/models';
const { Dealer, Country, State, City } = model;

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
            let dealers = [];
            dealers = await Dealer.getAllList(req.query);
            res.status(ok).send({ dealers });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async getDealer(req, res) {
        try {
            const { id } = req.params;
            const recordExist = await Dealer.getRecordById(id);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('dealer') });
            res.status(ok).send({ dealer: recordExist });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async getnearbydealer(req, res) {
        try {
            const { error } = validateLatLon(req.body);
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });
            let dealers = [];
            const { lat, lon } = req.body;
            dealers = await Dealer.getNearByDealer( lat, lon);
            if(!dealers) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(ok).send({ dealers });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },
}