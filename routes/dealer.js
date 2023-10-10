import express from "express";
const dealerRouter = express.Router();

import dealerToken from '../middleware/authToken'; // dealer token Middleware

/* Routes for Dealer Login */
import dealerloginControl from '../controllers/dealer/auth/LoginController';
dealerRouter.route('/login').post(dealerloginControl.getLogin);
dealerRouter.route('/logout').post(dealerloginControl.getLogout);

export default dealerRouter;