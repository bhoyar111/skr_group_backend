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
const { ProductSubCategory, ProductCategory } = model;

// validation import here
import validateProductSubCat from '../../requests/productSubCategoryRequest';

export default {
    async getProductSubCategoriesDS(req, res) {
        try {
            let product_categories = [];
            product_categories = await ProductCategory.getDS();
            res.status(ok).send({ product_categories });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async getProductSubCategories(req, res) {
        try {
            const { pageNo } = req.query;
            const page = checkDataIsValid(pageNo) ? pageNo : 1;
            const pageSize = pageLimit();

            const { id } = req.params;
            const decId = getDecryptId(id);
            const product_categories = await ProductCategory.getRecordById(decId);

            let product_subcategoriesRes = [];
            product_subcategoriesRes = await ProductSubCategory.getList(page, pageSize, decId);
            const pages = Math.ceil(product_subcategoriesRes.count / pageSize);

            const pageData = {
                total_record : product_subcategoriesRes.count,
                per_page     : pageSize,
                current_page : page,
                total_pages  : pages
            }
            const product_subcategories = checkDataIsValid(product_subcategoriesRes.rows) ? product_subcategoriesRes.rows : [];
            res.status(ok).send({ product_subcategories, product_categories, pageData });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async addProductSubCategory(req, res) {
        try {
            const { error } = validateProductSubCat(req.body);
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });
            //  image upload code starts
            let doc_url = "";
            if (req.files) {
                const uploadLocation = 'public/product/';
                const { message, up_file_path } = await moveFileFunction(req.files.doc_url, `./${uploadLocation}`);
                if (message) return  res.status(server_error).send({ message });
                if(!checkDataIsValid(up_file_path)) res.status(server_error).send({ message: getServerErrorMsg() });
                doc_url = up_file_path;
            }
            const sData = req.body;
            const product_subcategory = await ProductSubCategory.saveRecord({...sData, doc_url });
            if (!product_subcategory) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(created).send({ product_subcategory });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async getProductSubCategory(req, res) {
        try {
            const { id } = req.params;
            const decId = getDecryptId(id);
            const recordExist = await ProductSubCategory.getRecordById(decId);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('ProductSubCategory') });
            const product_categories = await ProductCategory.getDS();
            res.status(ok).send({ product_subcategory: recordExist, product_categories });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async updateProductSubCategory(req, res) {
        try {
            const { error } = validateProductSubCat(req.body);
            if (error) return res.status(bad_request).send({ error: getValidationErrMsg(error) });

            const { id } = req.params;
            const decId = getDecryptId(id);
            let recordExist = await ProductSubCategory.getRecordById(decId);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('ProductSubCategory') });
             //  image upload code starts
             if (req.files) {
                 const uploadLocation = 'public/product/';
                 const { message, up_file_path } = await moveFileFunction(req.files.doc_url, `./${uploadLocation}`);
                 if (message) return  res.status(server_error).send({ message });
                 if(!checkDataIsValid(up_file_path)) res.status(server_error).send({ message: getServerErrorMsg() });
                 req.body.doc_url = up_file_path;
             }

            const product_subcategory = await ProductSubCategory.updateRecord( recordExist, req.body );
            if (!product_subcategory) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(created).send({ product_subcategory });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    async deleteProductSubCategory(req, res) {
        try {
            const { id } = req.params;
            const decId = getDecryptId(id);
            let recordExist = await ProductSubCategory.getRecordById(decId);
            if (!recordExist) return res.status(bad_request).send({ message: getIdNotFoundCommonMsg('ProductSubCategory') });

            const product_subcategory = await ProductSubCategory.deleteRecord( recordExist );
            if (!product_subcategory) return  res.status(server_error).send({ message: getServerErrorMsg() });
            res.status(ok).send({ product_subcategory });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },

    // For Ck editor Img Upload
    async ckEditorProduct(req, res) {
        try {            
            let result = {
                uploaded: false,
                url: ''
            }

            if (req.files) {
                const uploadLocation = 'public/ck_product/';
                const { message, up_file_path } = await moveFileFunction(req.files.upload, `./${uploadLocation}`);
                if (message) return  res.status(server_error).send({ message });
                if(!checkDataIsValid(up_file_path)) res.status(server_error).send({ message: getServerErrorMsg() });
            
                result.uploaded = true;
                result.url = `${req.protocol}://${req.hostname}:${process.env.PORT}/` + up_file_path;
                // result.url = 'http://localhost:4000/' + up_file_path;
            }
                     
            res.status(ok).send(result);
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    }
}