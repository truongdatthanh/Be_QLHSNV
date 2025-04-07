var express = require('express');
var router = express.Router();
var positionController = require('../controllers/position')
let { CreateSuccessResponse, CreateErrorResponse } = require('../utils/responseHandler');

router.get('/', async function (req, res, next) {
    try {
        let position = await positionController.getAllPositions();
        CreateSuccessResponse(res, 200, position);
    } catch (error) {
        CreateErrorResponse(res, 400, error.message);
    }
});

router.post('/', async function (req, res, next) {
    try {
        let body = req.body;
        let newPosition = await positionController.createPosition(body);
        CreateSuccessResponse(res, 200, newPosition);
    } catch (error) {
        CreateErrorResponse(res, 400, error.message);
    }
});


module.exports = router;
