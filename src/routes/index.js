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
router.post('/api/alter-password', firebaseAuthController.alterPassword);


// Authenticated Routes
router.get('/dashboard', verifyToken, BanditController.dashboard);
router.get('/profile', verifyToken, BanditController.profile);
router.get('/ecrime/:key', verifyToken, BanditController.ecrime);
router.get('/create/bandit', verifyToken, BanditController.createBandit);
router.post('/create/bandit', verifyToken, BanditController.storeBandit);
router.get('/edit/bandit/:key', verifyToken, BanditController.editBandit);
router.post('/edit/bandit/:key', verifyToken, BanditController.updateBandit);



module.exports = router;