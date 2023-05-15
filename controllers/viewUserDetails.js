const { viewUserDetails } = require("./interact");


module.exports.viewUserDetails = async function(req, res) {
    var body = req.body;
     var json_=JSON.stringify(body);
     var jsonobj =(JSON.parse(json_));
    // const { email } = req.body;
    const userDetails = await viewUserDetails(jsonobj.email);
    // Do something with userDetails, such as sending it back in the response
    res.send(userDetails);
}