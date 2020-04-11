const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');
const verifyToken = require('../middleware/verification');

//Warranties
router.get('/users/:uid/warranties', verifyToken, ctrl.warranties.index);
router.get('/users/:uid/warranties/:wid', verifyToken, ctrl.warranties.show);
router.post('/users/:uid/warranties', verifyToken, ctrl.warranties.create);
router.put('/users/:uid/warranties/:wid', verifyToken, ctrl.warranties.update);
router.delete('/users/:uid/warranties/:wid', verifyToken, ctrl.warranties.destroy);

//Additionals
router.get('/users/:uid/additionals', verifyToken, ctrl.additionals.index);
router.get('/users/:uid/additionals/:aid', verifyToken, ctrl.additionals.show);
router.post('/users/:uid/additionals', verifyToken, ctrl.additionals.create);
router.put('/users/:uid/additionals/:aid', verifyToken, ctrl.additionals.update);
router.delete('/users/:uid/additionals/:aid', verifyToken, ctrl.additionals.destroy);

module.exports = router;