const express = require('express');

require('dotenv').config();

const bodyParser = require('body-parser');

const app = express();

app.use(express.urlencoded({extended: true }));

app.use(bodyParser.json());

const eventRouter = require("./routes/endpoints");


app.use(express.json());

app.use("/api",eventRouter);


const port = 8000;

app.listen(port, function(err){
    if(err)
    {
        console.log(`Error in runnig the server: ${port}`);
    }

    console.log(`Server is running on port: ${port}`);

});