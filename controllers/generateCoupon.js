const { generateCoupon } = require("./interact");

module.exports.generateCoupon = async function(req, res) {
  try {
    var body = req.body;
    var json_ = JSON.stringify(body);
    var jsonobj = JSON.parse(json_);

    const { hash, pin } = await generateCoupon(jsonobj.email, jsonobj.discount);

    const hashString = hash.toString(); // Assuming `hash` is a BigNumber or a non-circular object
    
    res.send(`Coupon generated for email ${jsonobj.email} with discount ${jsonobj.discount}. Card Id: ${hashString}, Pin: ${pin}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
}



