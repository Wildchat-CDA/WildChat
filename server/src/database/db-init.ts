import * as mysql from 'mysql2/promise';
import { config } from 'dotenv';

config();

async function initDatabase() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  });

  const dbName = process.env.DB_DATABASE;

  try {
    await connection.query(`DROP DATABASE IF EXISTS ${dbName}`);
    await connection.query(`CREATE DATABASE ${dbName}`);
    console.log(`Database ${dbName} initialized successfully`);
  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    await connection.end();
  }
}

initDatabase().catch(console.error);
