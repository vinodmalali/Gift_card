const { generateCoupon } = require("../service/interact");

module.exports.generateCoupon = async function(req, res) {
  try {
    var body = req.body;
    var json_ = JSON.stringify(body);
    var jsonobj = JSON.parse(json_);

    const { hash, pin , tx } = await generateCoupon(jsonobj.email, jsonobj.amount);

    const hashString = hash.toString(); // Assuming `hash` is a BigNumber or a non-circular object

    data = {
       status : 200,
       giftcard : hashString,
       pin : pin,
       txn : tx
    }
    
    res.send(data);
  } catch (error) {
    // console.error(error);
    res.status(500).send({status : 500 , err:error.message});
  }
}



