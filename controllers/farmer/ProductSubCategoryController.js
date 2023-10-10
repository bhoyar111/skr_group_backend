import sCode from "../../custom/status-codes";
const { ok, created, bad_request, server_error } = sCode;

import {
    getIdNotFoundCommonMsg,
} from '../../custom/error-msg';

// models import here
import model from '../../db/models';
const { ProductSubCategory, ProductCategory } = model;

export default {
    async getAllProductSubCategories(req, res) {
        try {
            let product_subcategories = [];
            product_subcategories = await ProductSubCategory.getAllLists();
            res.status(ok).send({ product_subcategories });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async getProductSubCategories(req, res) {
        try {
            const { id } = req.params;
            const product_categories = await ProductCategory.getRecordById(id);
            let product_subcategories = [];
            product_subcategories = await ProductSubCategory.getAllList(id);
            res.status(ok).send({ product_subcategories, product_categories });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async getProductSubCategory(req, res) {
        try {
            const { id } = req.params;
            const recordExist = await ProductSubCategory.getRecordById(id);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('ProductSubCategory') });
            res.status(ok).send({ product_subcategory: recordExist });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },
}