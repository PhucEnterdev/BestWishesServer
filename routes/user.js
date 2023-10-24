const router = require("express-promise-router")();
const uploadCloud = require("../middlewares/uploads");
const {validateBody ,validateParam, schemas} = require("../helpers/utils");
const UserController = require("../controllers/user");


router.route("/register")
    // register user
    .post(validateBody(schemas.registerSchema) ,UserController.register)

router.route("/login")
    // register user
    .post(validateBody(schemas.loginSchema) ,UserController.login)

router.route("/avatar")
    // update avatar
    .post(uploadCloud.single("avatar"), UserController.updateAvatar)

router.route("/info")
    //get info user
    .get(UserController.getInfoUser)

module.exports = router;