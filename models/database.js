import { createPool } from 'mysql2';
import Utilities from '../utilities/Utilities.js';
const config = await Utilities.loadJSON('../config.json');

export const database = createPool({
  host: config.mysql.database_host,
  user: config.mysql.database_username,
  password: config.mysql.database_password,
  database: config.mysql.database_name,
});
