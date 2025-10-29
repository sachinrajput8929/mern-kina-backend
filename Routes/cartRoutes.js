const router = require("express").Router();
const { authOptional, requireAuth } = require("../middleware/auth");

const {
  addToCart,
  getCart,
  removeFromCart,
  getCartItems,
} = require("../Controller/cartController");

 
router.post("/add", addToCart);
router.get("/list", getCart);
router.delete("/remove/:id", removeFromCart);
router.get('/items', getCartItems);
module.exports = router;
