const router = require("express").Router();
const authJWT = require("../helper/authJWT")
 
const viewUserDetails = require("../controllers/viewUserDetails");
const getBalance = require("../controllers/getBalance");
const generateCoupon = require("../controllers/generateCoupon");
const Apply_Discount = require("../controllers/applyDiscount");
const  Add_Recharge = require("../controllers/addRecharge");
const history  = require("../controllers/historyofHash");
const viewDiscount  = require("../controllers/viewDiscount");
const  {signup , loginValidation } = require("../service/loginSignup");

 
router.post("/user",authJWT,viewUserDetails.viewUserDetails);
router.post("/balance",authJWT,getBalance.getBalance);
router.post("/generategiftcard",authJWT,generateCoupon.generateCoupon);
router.post("/redeem",authJWT,Apply_Discount.Apply_Discount);
router.post("/recharge",authJWT,Add_Recharge.Add_Recharge);
router.post("/history",authJWT,history.history);
router.post("/viewredeem",authJWT,viewDiscount.viewDiscount);
router.post("/signup",signup);
router.post("/login",loginValidation);



module.exports = router;