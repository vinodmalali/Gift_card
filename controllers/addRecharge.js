const { Add_Recharge } = require("./interact");

module.exports.Add_Recharge = async function(req, res) {
    var body = req.body;
     var json_=JSON.stringify(body);
     var jsonobj =(JSON.parse(json_));

    // let result = "";
    // const { email, discount } = req.body;
    try{
        const result = await Add_Recharge(jsonobj.hash, jsonobj.amount , jsonobj.pin);
        
        if (result === '0') {
            // console.log("inside add recharge invalid pin");
            res.send("Invalid");
        } else {
            // Send a response indicating that the coupon has been generated
            res.send(`recharge successful for the hash ${jsonobj.hash}`);
        }
        
    }catch(err){
        // console.log("inside addrecharge catch");
        throw err;
        // console.log(err);
        // res.send(err.message);
    }
    
}