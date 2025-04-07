var userController = require('../controllers/users')
let jwt = require('jsonwebtoken')
let constants = require('../utils/constants')
module.exports = {
    // check_authentication: async function (req, res, next) {
    //     let token;
    //     if (!req.headers || !req.headers.authorization) {
    //         token = req.signedCookies.token;
    //     } else {
    //         let authorizedtoken = req.headers.authorization;
    //         if (!authorizedtoken.startsWith("Bearer")) {
    //             token = authorizedtoken.split(" ")[1];
    //         } else {
    // //                 token = authorizedtoken;
    // //             }
    //     }
    //     if (!token) {
    //         next(new Error("ban chua dang nhap"));
    //     } else {
    //         let result = jwt.verify(token, constants.SECRET_KEY);
    //         if (result.exp > Date.now()) {
    //             let user = await userController.GetUserByID(result.id);
    //             req.user = user;
    //             next();
    //         } else {
    //             next(new Error("ban chua dang nhap"));
    //         }x
    //     }
    // },
    
    check_authentication: async function (req, res, next) {
        let token;
        try {
            console.log("check_authentication")
            console.log(req.headers)
            if (!req.headers || !req.headers.authorization) {
                token = req.signedCookies.token;
            } else {
                let authorizedtoken = req.headers.authorization;
                if (authorizedtoken.startsWith("Bearer ")) {
                    token = authorizedtoken.split(" ")[1];
                } else {
                    token = authorizedtoken;
                }
            }
    
            if (!token) {
                return res.status(401).json({ message: "ban chua dang nhap" });
            }
    
            const result = jwt.verify(token, constants.SECRET_KEY);
            if (result.exp * 1000 > Date.now()) {
                const user = await userController.GetUserByID(result.id);
                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }
                req.user = user;
                next();
            } else {
                return res.status(401).json({ message: "Token het han" });
            }
        } catch (error) {
            console.error("Error in check_authentication:", error);
            return res.status(401).json({ message: "Token khong hop le" });
        }
    },


    check_authorization: function (requiredRole) {
        return function (req, res, next) {
            let userRole = req.user.role.name;
            if (!requiredRole.includes(userRole)) {
                next(new Error("ban khong co quyen"));
            } else {
                next()
            }
        }
    }
}