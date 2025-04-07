let categorySchema = require('../schemas/category');
const { containsSpecialCharacter, isNumeric } = require('../utils/validator');

module.exports = {
    GetAllCategories: async function () {
        return await categorySchema.find({});
    },
    GetCategoryByID: async function (id) {
        let category = await categorySchema.findById(id)
        return category;
    },
    GetCategoryByName: async function (name) {
        let category = await categorySchema.findOne({
            name: name
        })
        return category;
    },
    CreateCategory: async function (name) {
        try {
            if (!containsSpecialCharacter(name) && !isNumeric(name)) {
                let category = await categorySchema.findOne({
                    name: name
                });
                if (!category) {
                    category = new categorySchema({
                        name: name
                    });
                    return await category.save();
                } else {
                    throw new Error('Danh muc nay da ton tai');
                }
            } else {
                throw new Error('Danh muc khong hop le');
            }
        } catch (error) {
            throw new Error(error.message);
        }
    },
}
