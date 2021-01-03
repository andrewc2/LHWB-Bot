const mysql = require("mysql");
const config = require("../config.json")

const db = mysql.createPool({
	host: config.mySQL.host,
	user: config.mySQL.username,
	password: config.mySQL.password,
	database: config.mySQL.database,
    charset: "utf8mb4"
});

module.exports = { db }