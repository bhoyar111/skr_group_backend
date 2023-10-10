import express from "express";
const farmerRouter = express.Router();

import farmerToken from '../middleware/farmerToken'; // Farmer token Middleware

/* Routes for Farmer register */
import loginControl from '../controllers/farmer/auth/LoginController';
farmerRouter.route('/register').post(loginControl.getRegister);
farmerRouter.route('/verifylogin').post(loginControl.getVerifyLogin);
farmerRouter.route('/logout').post(loginControl.getLogout);
farmerRouter.route('/token').post(loginControl.getTokenFarmer);
/* Routes for Farmer Login */
farmerRouter.route('/farmer-login').post(loginControl.getFarmerLogin);
farmerRouter.route('/farmer-login-verify').post(loginControl.getFarmerLoginVerify);
/* Routes for Farmer*/
import farmerControl from '../controllers/farmer/FarmerController';
farmerRouter.route('/farmer-get/:id').get(farmerToken, farmerControl.getFarmer);
farmerRouter.route('/farmer-profile-update/:id').put(farmerToken, farmerControl.updateFarmerProfile);
farmerRouter.route('/farmer-crop-grown/:id').put(farmerToken, farmerControl.updateCropGrown);
farmerRouter.route('/farmer-IrrAc/:id').put(farmerToken, farmerControl.updateIrriAC);
/* Routes for Weather*/
import whaterController from '../controllers/farmer/WeatherController';
farmerRouter.route('/weather').post(whaterController.getWeather);
/* Routes for Crops*/
import cropControl from '../controllers/farmer/CropController';
farmerRouter.route('/crops').get(farmerToken, cropControl.getCrops);
farmerRouter.route('/crop-get/:id').get(farmerToken, cropControl.getCrop);
/* Routes for SubCrops*/
import cropSubControl from '../controllers/farmer/SubCropController';
farmerRouter.route('/allsubcrops').get(farmerToken, cropSubControl.getAllSubCrop);
farmerRouter.route('/subcrops/:id').get(farmerToken, cropSubControl.getSubCrops);
farmerRouter.route('/subcrop-get/:id').get(farmerToken, cropSubControl.getSubCrop);
/* Routes for Stage*/
import stageControl from '../controllers/farmer/StageController';
farmerRouter.route('/stages/:id').get(farmerToken, stageControl.getStages);
farmerRouter.route('/stages-get/:id').get(farmerToken, stageControl.getStage);
/* Routes for Stage*/
import stageInfoControl from '../controllers/farmer/StageInformationController';
farmerRouter.route('/stage-informations/:id').get(farmerToken, stageInfoControl.getStageInformations);
farmerRouter.route('/stage-information-get/:id').get(farmerToken, stageInfoControl.getStageInformation);
// Routes for Product Categories
import productcategoryControl from '../controllers/farmer/ProductCategoryController';
farmerRouter.route('/product-categories').get(farmerToken, productcategoryControl.getProductCategories);
// Routes for Product SubCategories
import productsubcategoryControl from '../controllers/farmer/ProductSubCategoryController';
farmerRouter.route('/product-subcategories').get(farmerToken, productsubcategoryControl.getAllProductSubCategories);
farmerRouter.route('/product-subcategories/:id').get(farmerToken, productsubcategoryControl.getProductSubCategories);
farmerRouter.route('/product-subcategory-get/:id').get(farmerToken, productsubcategoryControl.getProductSubCategory);
// Routes for Dealer
import dealerControl from '../controllers/farmer/DealerController';
farmerRouter.route('/dealers-ds').get(farmerToken, dealerControl.getDealerDS);
farmerRouter.route('/dealers').get(farmerToken, dealerControl.getDealers);
farmerRouter.route('/dealer-get/:id').get(farmerToken, dealerControl.getDealer);
farmerRouter.route('/dealer-nearby').post(dealerControl.getnearbydealer);
// Route for video 
import videoControl from '../controllers/farmer/VideoController';
farmerRouter.route('/videos').get(farmerToken, videoControl.getVideos);
// Route for Banner 
import bannerControl from '../controllers/farmer/BannerController';
farmerRouter.route('/banners').get(farmerToken, bannerControl.getBanners);
// Route for Ask The Expert 
import asktheexpertControl from '../controllers/farmer/AskTheExpertController';
farmerRouter.route('/asktheexperts-ds').get(farmerToken, asktheexpertControl.getAskExpertsDS);
farmerRouter.route('/asktheexperts').get(farmerToken, asktheexpertControl.getAskExperts);
farmerRouter.route('/asktheexpert-add').post(farmerToken, asktheexpertControl.addAskExpert);
// Routes for Community
import communityControl from '../controllers/farmer/CommunityController';
farmerRouter.route('/communities').get(farmerToken, communityControl.getCommunities);
farmerRouter.route('/community-add').post(farmerToken, communityControl.addCommunity);
farmerRouter.route('/community-get/:id').get(farmerToken, communityControl.getCommunity);
farmerRouter.route('/community-update/:id').put(farmerToken, communityControl.updateCommunity);
farmerRouter.route('/community-delete/:id').delete(farmerToken, communityControl.deleteCommunity);

export default farmerRouter;