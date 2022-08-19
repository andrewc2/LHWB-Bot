const { createPool } = require('mysql2');
const config = require('../../config.json');

exports.db = createPool({
	host: config.mySQL.database_host,
	user: config.mySQL.database_username,
	password: config.mySQL.database_password,
	database: config.mySQL.database_name,
});
