const { Add_Recharge } = require("./interact");

module.exports.Add_Recharge = async function(req, res) {
    var body = req.body;
     var json_=JSON.stringify(body);
     var jsonobj =(JSON.parse(json_));
    // const { email, discount } = req.body;
    await Add_Recharge(jsonobj.hash, jsonobj.amount );
    // Send a response indicating that the coupon has been generated
    res.send(`recharge sucessfull for the hash ${jsonobj.hash}`);
    // res.send(data);
}