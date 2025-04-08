var express = require('express');
var router = express.Router();
var departmentController = require('../controllers/department')
let { CreateSuccessResponse, CreateErrorResponse } = require('../utils/responseHandler');



router.get('/', async function (req, res, next) {
    try {
        let department = await departmentController.getAllDepartments();
        CreateSuccessResponse(res, 200, department);
    } catch (error) {
        CreateErrorResponse(res, 400, error.message);
    }
});

router.post('/', async function (req, res, next) {
    try {
        let body = req.body;
        let newDepartment = await departmentController.createDepartment(body);
        CreateSuccessResponse(res, 200, newDepartment);
    } catch (error) {
        CreateErrorResponse(res, 400, error.message);
    }
});

router.delete('/:id', async function (req, res, next) {
    try {
        let body = req.params.id;
        console.log("paramid", body);
        let department = await departmentController.deleteDepartment(body);
        CreateSuccessResponse(res, 200, department);
    } catch (error) {
        CreateErrorResponse(res, 400, error.message);
    }
});


module.exports = router;
