let userSchema = require('../schemas/user')
let roleSchema = require('../schemas/role')
let bcrypt = require('bcrypt')
module.exports = {
  GetAllUser: async function () {
    return await userSchema.find({}).populate('role')
  },
  GetUserByID: async function (id) {
    return await userSchema.findById(id).populate('role')
  },
  GetUserByEmail: async function (email) {
    return await userSchema.findOne({
      email: email
    }).populate('role')
  },
  GetUserByToken: async function (token) {
    return await userSchema.findOne({
      resetPasswordToken: token
    }).populate('role')
  },
  CreateAnUser: async function (username, password, email, role) {
    try {
      let roleObj = await roleSchema.findOne({
        name: role
      })
      if (roleObj) {
        let newUser = new userSchema({
          username: username,
          password: password,
          email: email,
          role: roleObj._id
        })
        return await newUser.save();
      } else {
        throw new Error('role khong ton tai')
      }
    } catch (error) {
      throw new Error(error.message)
    }
  },
  UpdateAnUser: async function (id, body) {
    let allowField = ["password", "email", "imgURL"];
    let getUser = await userSchema.findById(id);
    for (const key of Object.keys(body)) {
      if (allowField.includes(key)) {
        getUser[key] = body[key]
      }
    }
    return await getUser.save();
  },
  DeleteAnUser: async function (id) {
    return await userSchema.findByIdAndUpdate(id, { status: false }
      , {
        new: true
      });
  },
  CheckLogin: async function (username, password) {
    let user = await userSchema.findOne({
      username: username
    });
    if (!user) {
      throw new Error("username khong chinh xac")
    } else {
      if (bcrypt.compareSync(password, user.password)) {
        return user._id
      } else {
        throw new Error("password khong chinh xac")
      }
    }
  },
  Change_Password: async function (user, oldpassword, newpassword, confirmpassword) {
    try {
      if (bcrypt.compareSync(oldpassword, user.password)) {
        if (bcrypt.compareSync(newpassword, user.password)) {
          throw new Error('mat khau moi khong duoc trung voi mat khau cu')
        } else {
          if (newpassword === confirmpassword) {
            user.password = newpassword;
            await user.save();
            return "thay doi mat khau thanh cong";
          } else {
            throw new Error('mat khau khong trung khop');
          }
        }
      } else {
        throw new Error('mat khau cu khong chinh xac')
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
}