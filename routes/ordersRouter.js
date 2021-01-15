const express = require("express");
const router = express.Router();

const autheMiddleware = require("../middleware/authenticate");
const orderController = require("../controllers/orderController");
/* GET ORDERS  page. */
router.get(
  "/orders/new",
  autheMiddleware.authenUser,
  orderController.renderOrderPage
);

/* GET Order  page. */
router.get(
  "/api/orders",
  autheMiddleware.authenUser,
  orderController.getAPIOrders
);

router.put(
  "/api/orders/update/status",
  autheMiddleware.authenUser,
  orderController.updateStatusOrder
);

module.exports = router;
