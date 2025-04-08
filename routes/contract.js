var express = require('express');
var router = express.Router();
var contractController = require('../controllers/contract')
let { CreateSuccessResponse, CreateErrorResponse } = require('../utils/responseHandler');


router.get('/', async function (req, res, next) {
    try {
        let contracts = await contractController.getAllContracts();
        CreateSuccessResponse(res, 200, contracts);
    } catch (error) {
        CreateErrorResponse(res, 400, error.message);
    }
});

router.post('/', async function (req, res, next) {
    try {
        let body = req.body;
        console.log(body);
        let newContract = await contractController.createContract(body);
        CreateSuccessResponse(res, 200, newContract);
    } catch (error) {
        CreateErrorResponse(res, 400, error.message);
    }
});

router.get('/:id', async function (req, res, next) {
    try {
        let body = req.body;
        console.log("paramid", req.params.id);
        let contract = await contractController.getContractsByEmployeeId(req.params.id, body);
        CreateSuccessResponse(res, 200, contract);
    } catch (error) {
        CreateErrorResponse(res, 400, error.message);
    }
}
);

module.exports = router;
