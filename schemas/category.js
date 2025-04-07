let mongoose = require('mongoose');

let categorySchema = mongoose.Schema({
    name:{
        type:String,
        required:[true, "Tên danh mục không được để trống"],
        unique: true,
        minlength: [3, "Tên danh mục phải có ít nhất 3 ký tự"],
        maxlength: [10, "Tên danh mục không được quá 10 ký tự"]
    },description:{
        type:String,
        default:""
    }
},{
    timestamps:true
})
module.exports = mongoose.model('category',categorySchema)
// Tao 1 schema cho obj category gồm name,description, timestamp