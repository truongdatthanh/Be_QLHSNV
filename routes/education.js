var express = require('express');
var router = express.Router();
var educationController = require('../controllers/education')
let { CreateSuccessResponse, CreateErrorResponse } = require('../utils/responseHandler');

router.get('/', async function (req, res, next) {
    try {
        let edus = await educationController.getAllEducations();
        CreateSuccessResponse(res, 200, edus);
    } catch (error) {
        CreateErrorResponse(res, 400, error.message);
    }
});

router.post('/', async function (req, res, next) {
    try {
        let body = req.body;
        let newEdu = await educationController.createEducation(body);
        CreateSuccessResponse(res, 200, newEdu);
    } catch (error) {
        CreateErrorResponse(res, 400, error.message);
    }
});


module.exports = router;
