const express = require('express');
const { body } = require('express-validator');

const itemController = require('../controllers/items');

const router = express.Router();

const userValidation = [
  body('first_name').isString().trim().isLength({ min: 2, max: 25 }),
  body('last_name').isString().trim().isLength({ min: 2, max: 25 }),
  body('email').isEmail().isLength({ min: 5, max: 25 }),
];

router.get('/users', itemController.getUsers);

router.get('/funds', itemController.getFunds);

router.get('/fund_financials', itemController.getFinancials);

router.post('/user', userValidation, itemController.postUser);

router.put('/user_invest', itemController.putInvest);

router.put('/user_withdraw', itemController.putWithdraw);

module.exports = router;
