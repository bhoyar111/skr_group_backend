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
const { ProductCategory } = model;

// validation import here
import validateProductCat from '../../requests/productCategoryRequest';

export default {
    async getProductCategories(req, res) {
        try {
            const { pageNo } = req.query;
            const page = checkDataIsValid(pageNo) ? pageNo : 1;
            const pageSize = pageLimit();

            let product_categoriesRes = [];
            product_categoriesRes = await ProductCategory.getList(page, pageSize);
            const pages = Math.ceil(product_categoriesRes.count / pageSize);

            const pageData = {
                total_record : product_categoriesRes.count,
                per_page     : pageSize,
                current_page : page,
                total_pages  : pages
            }
            const product_categories = checkDataIsValid(product_categoriesRes.rows) ? product_categoriesRes.rows : [];
            res.status(ok).send({ product_categories, pageData });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async addProductCategory(req, res) {
        try {
            const { error } = validateProductCat(req.body);
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });
            const product_category = await ProductCategory.saveRecord(req.body);
            if (!product_category) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(created).send({ product_category });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async getProductCategory(req, res) {
        try {
            const { id } = req.params;
            const decId = getDecryptId(id);
            const recordExist = await ProductCategory.getRecordById(decId);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('ProductCategory') });
            res.status(ok).send({ product_category: recordExist });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async updateProductCategory(req, res) {
        try {
            const { error } = validateProductCat(req.body);
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });

            const { id } = req.params;
            const decId = getDecryptId(id);
            let recordExist = await ProductCategory.getRecordById(decId);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('ProductCategory') });

            const product_category = await ProductCategory.updateRecord( recordExist, req.body );
            if (!product_category) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(created).send({ product_category });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async deleteProductCategory(req, res) {
        try {
            const { id } = req.params;
            const decId = getDecryptId(id);
            let recordExist = await ProductCategory.getRecordById(decId);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('ProductCategory') });

            const product_category = await ProductCategory.deleteRecord( recordExist );
            if (!product_category) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(ok).send({ product_category });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    }
}