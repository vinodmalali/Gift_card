const {createPool} = require("mysql");

const pool = createPool({
    port : 3306,
    host: "localhost",
    user: "root",
    password: "",
    database: "gift_card"
    
});

module.exports  =  
    pool;