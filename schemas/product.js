let mongoose = require('mongoose');

let productSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true, "Ten san pham khong duoc de trong" ],
        unique: [true, "Ten san pham da ton tai"],
        minLength: [5, "Ten san pham phai co it nhat 5 ky tu"],
        maxLength: [200, "Ten san pham phai co toi da 200 ky tu"],
    },quantity:{
        type:Number,
        min: [1, "So luong phai lon hon 0"],
        max: [100, "So luong phai be hon 100"],
        required:[true, "So luong khong duoc de trong"],
    },price:{
        type:Number,
        required:[true, "Gia khong duoc de trong"],
    },description:{
        type:String,
        default:""
    },imgURL:{
        type:String,
        default:""
    },category:{
        type:mongoose.Types.ObjectId,
        ref:'category',
        required:true
    }
    ,isDeleted:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})
module.exports = mongoose.model('product',productSchema)
// Tao 1 schema cho obj category gồm name,description, timestamp