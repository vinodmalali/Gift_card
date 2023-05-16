const { getBalance } = require("./interact");


module.exports.getBalance = async function(req, res) {
    var body = req.body;
     var json_=JSON.stringify(body);
     var jsonobj =(JSON.parse(json_));
    // const { email } = req.body;
    try{
        const bal = await getBalance(jsonobj.hash,jsonobj.pin);
    // Do something with userDetails, such as sending it back in the response
        res.send(bal);

    }catch(err){
        
        res.send(err.message);
    }
    
}