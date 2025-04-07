var express = require('express');
var router = express.Router();
var rpController = require('../controllers/rewardPunishment')
let { CreateSuccessResponse, CreateErrorResponse } = require('../utils/responseHandler');



router.get('/', async function (req, res, next) {
    try {
        let rps = await rpController.getAllRP();
        CreateSuccessResponse(res, 200, rps);
    } catch (error) {
        CreateErrorResponse(res, 400, error.message);
    }
});

router.post('/', async function (req, res, next) {
    try {
        let body = req.body;
        let newRP = await rpController.createRP(body);
        CreateSuccessResponse(res, 200, newRP);
    } catch (error) {
        CreateErrorResponse(res, 400, error.message);
    }
});


module.exports = router;
