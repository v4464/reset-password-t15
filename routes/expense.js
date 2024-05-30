const path = require('path');
const express = require('express');

const router = express.Router();
const expenseController = require('../controllers/expense');
const userauthentication = require('../middleware/auth');

router.post('/addexpense', userauthentication.authenticate,  expenseController.addexpense)
router.get('/getexpenses',userauthentication.authenticate, expenseController.getexpenses)
router.delete('/deleteexpense/:expenseid', expenseController.deleteexpense)

module.exports = router;