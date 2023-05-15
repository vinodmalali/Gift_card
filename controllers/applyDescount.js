const { Apply_Discount } = require("./interact");

module.exports.Apply_Discount = async function(req, res) {
    var body = req.body;
     var json_=JSON.stringify(body);
     var jsonobj =(JSON.parse(json_));
    // const { email, discount } = req.body;
    const data = await Apply_Discount(jsonobj.total, jsonobj.amount , jsonobj.id);
    // Send a response indicating that the coupon has been generated
    res.send(data);
    // res.send(data);
}