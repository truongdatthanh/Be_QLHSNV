let categorySchema = require('../schemas/category');
let productSchema = require('../schemas/product');
const { isAlphabetic } = require('../utils/validator');

module.exports = {
    GetAllProducts: async function () {
        return await productSchema.find({}).populate('category');
    },

    CreateProduct: async function (body) {
        try {
            // Kiểm tra giá có hợp lệ không
            if (!body.price) {
                throw new Error("Gia san pham khong duoc de trong");
            }
            if (isAlphabetic(body.price)) {
                throw new Error("gia san pham khong hop le");
            }
            if (body.price <= 0) {
                throw new Error("Gia san pham phai lon hon 0");
            }
            if (body.price < 1000 || body.price > 1000000) {
                throw new Error("Gia san pham phai tu 1 nghin den 1 trieu");
            }
            // Kiểm tra danh mục tồn tại
            const category = await categorySchema.findOne({ name: body.category });
            if (!category) {
                throw new Error("Danh muc khong ton tai");
            }
    
            // Tạo sản phẩm mới
            const newProduct = new productSchema({
                name: body.name,
                price: body.price,
                quantity: body.quantity,
                category: category._id
            });
    
            return await newProduct.save();
        } catch (error) {
            throw new Error(error.message);
        }
    },
}