import express from "express";
const apiRouter = express.Router();

import authToken from '../middleware/authToken'; // Auth token Middleware

/* Routes for Login */
import loginControl from '../controllers/admin/auth/LoginController';
apiRouter.route('/login').post(loginControl.getLogin);
apiRouter.route('/logout').post(loginControl.getLogout);
apiRouter.route('/token').post(loginControl.getToken);
/* Routes for Language master */
import languageControl from '../controllers/admin/LanguageController';
apiRouter.route('/languages').get(languageControl.getLanguages);
apiRouter.route('/language-add').post(languageControl.addLanguage);
apiRouter.route('/language-get/:id').get(languageControl.getLanguage);
apiRouter.route('/language-update/:id').put(languageControl.updateLanguage);
apiRouter.route('/language-delete/:id').delete(languageControl.deleteLanguage);
/* Routes for Language description */
import languagedescControl from '../controllers/admin/LanguageDescController';
apiRouter.route('/lngdescriptions').get(languagedescControl.getLanguageDescriptions);
apiRouter.route('/lngdescription-add').post(languagedescControl.addLanguageDescription);
apiRouter.route('/lngdescription-get/:id').get(languagedescControl.getLanguageDescription);
apiRouter.route('/lngdescription-update/:id').put(languagedescControl.updateLanguageDescription);
apiRouter.route('/lngdescription-delete/:id').delete(languagedescControl.deleteLanguageDescription);
/* Routes for User */
import userControl from '../controllers/admin/UserController';
apiRouter.route('/users-ds').get(authToken, userControl.getUsersDS);
apiRouter.route('/users').get(authToken, userControl.getUsers);
apiRouter.route('/user-add').post(authToken, userControl.addUser);
apiRouter.route('/user-get/:id').get(authToken, userControl.getUser);
apiRouter.route('/user-update/:id').put(authToken, userControl.updateUser);
apiRouter.route('/user-delete/:id').delete(authToken, userControl.deleteUser);
//Route for Change password & profile update
apiRouter.route('/change-password/:id').post(authToken, userControl.changePassword);
apiRouter.route('/profile-update/:id').post(authToken, userControl.updateProfile);
/* Routes for Role */
import roleControl from '../controllers/admin/RoleController';
apiRouter.route('/roles').get(roleControl.getRoles);
apiRouter.route('/role-add').post(roleControl.addRole);
apiRouter.route('/role-get/:id').get(roleControl.getRole);
apiRouter.route('/role-update/:id').put(roleControl.updateRole);
apiRouter.route('/role-delete/:id').delete(roleControl.deleteRole);
// to get all methods and modules for role & permission
apiRouter.route('/get-all-permissions').get(authToken, roleControl.getModules);
/* Routes for Farmers*/
import farmerControl from '../controllers/admin/FarmerController';
apiRouter.route('/farmers-ds').get(authToken, farmerControl.getFarmersDS);
apiRouter.route('/farmers').get(authToken, farmerControl.getFarmers);
apiRouter.route('/farmer-add').post(authToken, farmerControl.addFarmer);
apiRouter.route('/farmer-get/:id').get(authToken, farmerControl.getFarmer);
apiRouter.route('/farmer-update/:id').put(authToken, farmerControl.updateFarmer);
apiRouter.route('/farmer-delete/:id').delete(authToken, farmerControl.deleteFarmer);
apiRouter.route('/farmer-crop-grown-update/:id').put(authToken, farmerControl.updateFarmerCropGrown);
/* Routes for Country */
import countryControl from '../controllers/admin/CountryController';
apiRouter.route('/countries').get(authToken, countryControl.getCountries);
apiRouter.route('/country-add').post(authToken, countryControl.addCountry);
apiRouter.route('/country-get/:id').get(authToken, countryControl.getCountry);
apiRouter.route('/country-update/:id').put(authToken, countryControl.updateCountry);
apiRouter.route('/country-delete/:id').delete(authToken, countryControl.deleteCountry);
/* Routes for State */
import stateControl from '../controllers/admin/StateController';
apiRouter.route('/states-ds').get(authToken, stateControl.getStatesDS);
apiRouter.route('/states').get(authToken, stateControl.getStates);
apiRouter.route('/state-add').post(authToken, stateControl.addState);
apiRouter.route('/state-get/:id').get(authToken, stateControl.getState);
apiRouter.route('/state-update/:id').put(authToken, stateControl.updateState);
apiRouter.route('/state-delete/:id').delete(authToken, stateControl.deleteState);
/* Routes for City */
import cityControl from '../controllers/admin/CityController';
apiRouter.route('/cities-ds').get(cityControl.getCitiesDS);
apiRouter.route('/cities').get(cityControl.getCities);
apiRouter.route('/city-add').post(cityControl.addCity);
apiRouter.route('/city-get/:id').get(cityControl.getCity);
apiRouter.route('/city-update/:id').put(cityControl.updateCity);
apiRouter.route('/city-delete/:id').delete(cityControl.deleteCity);
/* Routes for Crop */
import cropControl from '../controllers/admin/CropController';
apiRouter.route('/crops-ds').get(authToken, cropControl.getCropsDS);
apiRouter.route('/crops').get(authToken, cropControl.getCrops);
apiRouter.route('/crop-add').post(authToken, cropControl.addCrop);
apiRouter.route('/crop-get/:id').get(authToken, cropControl.getCrop);
apiRouter.route('/crop-update/:id').put(authToken, cropControl.updateCrop);
apiRouter.route('/crop-delete/:id').delete(authToken, cropControl.deleteCrop);
/* Routes for Sub Crop */
import subcropControl from '../controllers/admin/SubCropController';
apiRouter.route('/subcrops-ds').get(authToken, subcropControl.getSubCropsDS);
apiRouter.route('/subcrops').get(authToken, subcropControl.getSubCrops);
apiRouter.route('/subcrop-add').post(authToken, subcropControl.addSubCrop);
apiRouter.route('/subcrop-get/:id').get(authToken, subcropControl.getSubCrop);
apiRouter.route('/subcrop-update/:id').put(authToken, subcropControl.updateSubCrop);
apiRouter.route('/subcrop-delete/:id').delete(authToken, subcropControl.deleteSubCrop);
/* Routes for Stages */
import stageControl from '../controllers/admin/StageController';
apiRouter.route('/stages-ds').get(authToken, stageControl.getStagesDS);
apiRouter.route('/stages/:id').get(authToken, stageControl.getStages);
apiRouter.route('/stage-add').post(authToken, stageControl.addStage);
apiRouter.route('/stage-get/:id').get(authToken, stageControl.getStage);
apiRouter.route('/stage-update/:id').put(authToken, stageControl.updateStage);
apiRouter.route('/stage-delete/:id').delete(authToken, stageControl.deleteStage);
apiRouter.route('/ck-editor-stage').post(stageControl.ckEditorStage);
/* Routes for Stage Information */
import stageInfoControl from '../controllers/admin/StageInformationController';
apiRouter.route('/stage-informations-ds').get(authToken, stageInfoControl.getStageInformationsDS);
apiRouter.route('/stage-informations/:id').get(authToken, stageInfoControl.getStageInformations);
apiRouter.route('/stage-information-add').post(authToken, stageInfoControl.addStageInformation);
apiRouter.route('/stage-information-get/:id').get(authToken, stageInfoControl.getStageInformation);
apiRouter.route('/stage-information-update/:id').put(authToken, stageInfoControl.updateStageInformation);
apiRouter.route('/stage-information-delete/:id').delete(authToken, stageInfoControl.deleteStageInformation);
apiRouter.route('/ck-editor-stage-info').post(stageInfoControl.ckEditorStageInfo);
/* Routes for Product Categories */
 import productcategoryControl from '../controllers/admin/ProductCategoryController';
 apiRouter.route('/product-categories').get(authToken, productcategoryControl.getProductCategories);
 apiRouter.route('/product-category-add').post(authToken, productcategoryControl.addProductCategory);
 apiRouter.route('/product-category-get/:id').get(authToken, productcategoryControl.getProductCategory);
 apiRouter.route('/product-category-update/:id').put(authToken, productcategoryControl.updateProductCategory);
 apiRouter.route('/product-category-delete/:id').delete(authToken, productcategoryControl.deleteProductCategory);
 /* Routes for Product SubCategories */
 import productsubcategoryControl from '../controllers/admin/ProductSubCategoryController';
 apiRouter.route('/product-subategories-ds').get(authToken, productsubcategoryControl.getProductSubCategoriesDS);
 apiRouter.route('/product-subcategories/:id').get(authToken, productsubcategoryControl.getProductSubCategories);
 apiRouter.route('/product-subcategory-add').post(authToken, productsubcategoryControl.addProductSubCategory);
 apiRouter.route('/product-subcategory-get/:id').get(authToken, productsubcategoryControl.getProductSubCategory);
 apiRouter.route('/product-subcategory-update/:id').put(authToken, productsubcategoryControl.updateProductSubCategory);
 apiRouter.route('/product-subcategory-delete/:id').delete(authToken, productsubcategoryControl.deleteProductSubCategory);
 apiRouter.route('/ck-editor-product').post(productsubcategoryControl.ckEditorProduct);
/* Routes for Dealer */
import dealerControl from '../controllers/admin/DealerController';
apiRouter.route('/dealers-ds').get(authToken, dealerControl.getDealerDS);
apiRouter.route('/dealers').get(authToken, dealerControl.getDealers);
apiRouter.route('/dealer-add').post(authToken, dealerControl.addDealer);
apiRouter.route('/dealer-get/:id').get(authToken, dealerControl.getDealer);
apiRouter.route('/dealer-update/:id').put(authToken, dealerControl.updateDealer);
apiRouter.route('/dealer-delete/:id').delete(authToken, dealerControl.deleteDealer);
apiRouter.route('/dealer-excel-upload').post(authToken, dealerControl.addExcelDealer);
/* Routes for Video */
import videoControl from '../controllers/admin/VideoController';
apiRouter.route('/videos-ds').get(videoControl.getVideosDS);
apiRouter.route('/videos').get(videoControl.getVideos);
apiRouter.route('/video-add').post(videoControl.addVideo);
apiRouter.route('/video-get/:id').get(videoControl.getVideo);
apiRouter.route('/video-update/:id').put(videoControl.updateVideo);
apiRouter.route('/video-delete/:id').delete(videoControl.deleteVideo);
/* Routes for Banner */
import bannerControl from '../controllers/admin/BannerController';
apiRouter.route('/banners').get(bannerControl.getBanners);
apiRouter.route('/banner-add').post(bannerControl.addBanner);
apiRouter.route('/banner-get/:id').get(bannerControl.getBanner);
apiRouter.route('/banner-update/:id').put(bannerControl.updateBanner);
apiRouter.route('/banner-delete/:id').delete(bannerControl.deleteBanner);
/* Routes for Ask The Expert */
import askexpertControl from '../controllers/admin/AskTheExpertController';
apiRouter.route('/asktheexperts-ds').get(askexpertControl.getAskExpertDS);
apiRouter.route('/asktheexperts').get(askexpertControl.getAskExperts);
apiRouter.route('/asktheexpert-add').post(askexpertControl.addAskExpert);
apiRouter.route('/asktheexpert-get/:id').get(askexpertControl.getAskExpert);
apiRouter.route('/asktheexpert-update/:id').put(askexpertControl.updateAskExpert);
apiRouter.route('/asktheexpert-delete/:id').delete(askexpertControl.deleteAskExpert);

export default apiRouter;