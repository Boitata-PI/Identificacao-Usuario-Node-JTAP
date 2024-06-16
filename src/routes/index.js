const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware');

const firebaseAuthController = require('../controllers/firebase-auth-controller');
const BanditController = require('../controllers/bandit-controller.js');


// Auth routes
router.post('/api/register', firebaseAuthController.registerUser);
router.post('/api/login', firebaseAuthController.loginUser);
router.post('/api/logout', firebaseAuthController.logoutUser);
router.post('/api/reset-password', firebaseAuthController.resetPassword);


// Bandit routes
router.get('/dashboard', verifyToken, BanditController.dashboard);
router.get('/ecrime', verifyToken, BanditController.getBandit);
router.get('/edit', verifyToken, BanditController.editBandit);
router.post('/update', verifyToken, BanditController.updateBandit);



module.exports = router;