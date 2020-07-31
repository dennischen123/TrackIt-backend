const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');
const verifyToken = require('../middleware/verification');
// const pdf = require('html-pdf');
// const pdfTemplate = require('../documents');


const upload = require('../config/multer.config');
//Ping test
router.get('/ping', () => console.log("pinged"));

//AWS
router.post('/upload', upload.single("file"), ctrl.aws.doUpload);

//Users
router.get('/users', ctrl.users.index);
router.post('/users', ctrl.users.create);


//PDF
router.post('/create-pdf', ctrl.pdf.createPdf);
router.get('/fetch-pdf', ctrl.pdf.fetchPdf);


//Warranties
router.get('/users/:uid/warranties', ctrl.warranties.index);
router.get('/users/:uid/warranties/:wid', ctrl.warranties.show);
router.post('/users/:uid/warranties', ctrl.warranties.create);
router.put('/users/:uid/warranties/:wid', ctrl.warranties.update);
router.delete('/users/:uid/warranties/:wid', ctrl.warranties.destroy);


module.exports = router;