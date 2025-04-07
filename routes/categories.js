var express = require('express');
var router = express.Router();
let categorySchema = require('../schemas/category');
const { containsSpecialCharacter } = require('../utils/validator');
const { CreateErrorResponse, CreateSuccessResponse } = require('../utils/responseHandler');
const { GetAllCategories, CreateCategory } = require('../controllers/category');

/* GET users listing. */
router.get('/', async function (req, res, next) {
    let categories = await GetAllCategories();
    if (categories.length === 0) {
        return CreateErrorResponse(res, 404, "Khong co danh muc nao");
    }
    CreateSuccessResponse(res, 200, categories);
});

router.get('/:id', async function (req, res, next) {
    try {
        let category = await categorySchema.findById(req.params.id);
        res.send({
            success: true,
            data: category
        });
    } catch (error) {
        res.status(404).send({
            success: false,
            message: error.message
        })
    }
});
router.post('/', async function (req, res, next) {
    try {
        let body = req.body;
        let newCategory = await CreateCategory(body.name);
        CreateSuccessResponse(res, 200, newCategory);
    } catch (error) {
        CreateErrorResponse(res, 400, error.message);
    }
});

router.put('/:id', async function (req, res, next) {
    try {
        let body = req.body;
        let updatedObj = {}
        if (body.name) {
            updatedObj.name = body.name
        }
        let updatedCategory = await categorySchema.findByIdAndUpdate(req.params.id, updatedObj, { new: true })
        res.status(200).send({
            success: true,
            data: updatedCategory
        });
    } catch (error) {
        res.status(404).send({
            success: false,
            message: error.message
        })
    }
});
router.delete('/:id', async function (req, res, next) {
    try {
        let body = req.body;
        let updatedCategory = await categorySchema.findByIdAndUpdate(req.params.id, {
            isDeleted: true
        }, { new: true })
        res.status(200).send({
            success: true,
            data: updatedCategory
        });
    } catch (error) {
        res.status(404).send({
            success: false,
            message: error.message
        })
    }
});


module.exports = router;
