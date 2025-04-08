var express = require('express');
var router = express.Router();
var employeeController = require('../controllers/employee')
let { CreateSuccessResponse, CreateErrorResponse } = require('../utils/responseHandler');



router.get('/', async function (req, res, next) {
    try {
        let employees = await employeeController.getAllEmployees();
        CreateSuccessResponse(res, 200, employees);
    } catch (error) {
        CreateErrorResponse(res, 400, error.message);
    }
});

router.post('/', async function (req, res, next) {
    try {
        let body = req.body;
        console.log("create: " , body);
        let newEmployee = await employeeController.createEmployee(body);
        CreateSuccessResponse(res, 200, newEmployee);
    } catch (error) {
        CreateErrorResponse(res, 400, error.message);
    }
});




module.exports = router;
