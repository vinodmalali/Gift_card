const { history } = require("./interact");


module.exports.history = async function(req, res) {
    var body = req.body;
     var json_=JSON.stringify(body);
     var jsonobj =(JSON.parse(json_));
    // const { email } = req.body;
    const h = await history(jsonobj.hash);
    // Do something with userDetails, such as sending it back in the response
    res.send(h);
}