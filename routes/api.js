const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');
const verifyToken = require('../middleware/verification');
// const multer = require('multer');
const pdf = require('html-pdf');
const pdfTemplate = require('../documents');


const upload = require('../config/multer.config');
//Ping test
router.get('/ping', () => console.log("pinged"));

//AWS
router.post('/upload', upload.single("file"), ctrl.aws.doUpload);

//Users
router.get('/users', ctrl.users.index);


//PDF routes
router.post('/create-pdf', (req, res) => {
    console.log("create-pdf")
    pdf.create(pdfTemplate(req.body), {}).toFile(`${__dirname}/new.pdf`,
        (err) => {
            if (err) {
                return console.log(err);
            }
            res.send(Promise.resolve())
        })
})

router.get('/fetch-pdf', (req, res) => {
    console.log("fetch-pdf");
    res.sendFile(`${__dirname}/new.pdf`);
})


//Warranties
router.get('/users/:uid/warranties', ctrl.warranties.index);
router.get('/users/:uid/warranties/:wid', ctrl.warranties.show);
router.post('/users/:uid/warranties', ctrl.warranties.create);
router.put('/users/:uid/warranties/:wid', ctrl.warranties.update);
router.delete('/users/:uid/warranties/:wid', ctrl.warranties.destroy);

//Additionals
router.get('/users/:uid/additionals', verifyToken, ctrl.additionals.index);
router.get('/users/:uid/additionals/:aid', verifyToken, ctrl.additionals.show);
router.post('/users/:uid/additionals', verifyToken, ctrl.additionals.create);
router.put('/users/:uid/additionals/:aid', verifyToken, ctrl.additionals.update);
router.delete('/users/:uid/additionals/:aid', verifyToken, ctrl.additionals.destroy);

module.exports = router;