import sCode from "../../custom/status-codes";
const { ok, created, bad_request, server_error } = sCode;

// models import here
import model from '../../db/models';
const { ProductCategory } = model;

export default {
    async getProductCategories(req, res) {
        try {
            let product_categories = [];
            product_categories = await ProductCategory.getAllList();
            res.status(ok).send({ product_categories });
        } catch (e) {
            console.log(e);
            res.status(server_error).send(e);
        }
    },
}