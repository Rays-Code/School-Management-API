import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config(); 

// Getting the certificate from the environment
const caPem = process.env.CA_PEM;

const caFilePath = path.join('/tmp', 'ca.pem');

// Write file only once
if (!fs.existsSync(caFilePath)) {
  fs.writeFileSync(caFilePath, caPem);
}


let connection;

export const getDBConnection = async () => {
  if (!connection) {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      port: Number(process.env.DB_PORT) || 25060,
      ssl: {
        ca: fs.readFileSync(caFilePath),
        rejectUnauthorized: false,
      },
    });

    await connection.query(`
      CREATE TABLE IF NOT EXISTS schools (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(150),
        address VARCHAR(255),
        latitude FLOAT,
        longitude FLOAT
      )
    `);
  }
  return connection;
};
