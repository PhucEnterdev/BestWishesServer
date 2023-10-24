const router = require("express-promise-router")();
const {validateBody ,validateParam, schemas} = require("../helpers/utils");
const WishController = require("../controllers/wish");


router.route("/")
    .post(WishController.publishWish)
    .get(WishController.getAllWishes)
    .patch(WishController.updateWish)
    .delete(WishController.deleteWish)

module.exports = router;