require("dotenv").config();
import apiRouter from './routes/api';
import farmerRouter from './routes/farmer';
import dealerRouter from './routes/dealer';
import express from 'express';
import logger from 'morgan';
// import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import fileUpload from 'express-fileupload';
// import multiparty from 'connect-multiparty'

const app = express() // setup express application

// const MultipartyMiddleware = multiparty({uploadDir:'./images'}); //ck editor img upload

app.use(logger('dev')); // log requests to the console

// Parse incoming requests data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/',
    createParentPath : true
}));

app.use(cors());
app.use(farmerRouter); // farmer routes
app.use('/dealer', dealerRouter); // dealer routes
app.use('/admin', apiRouter); // admin routes

app.use(express.static(path.join(__dirname, 'public')));

app.listen(process.env.PORT, (err) => {
    if (err) return console.log(`con not listen to port: ${process.env.PORT}`);
    console.log(`server is listening to port: ${process.env.PORT}/`);

// app.post('/uploads', MultipartyMiddleware, (req, res) => {
// console.log(req.files.upload);
// })
});