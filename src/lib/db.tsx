import mongoose from "mongoose";
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || "mysql",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "yourpassword",
  database: process.env.MYSQL_DATABASE || "data_app",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});


export async function connectSQL() {
  try {
    const connection = await pool.getConnection();
    console.log("Successfully connected to MySQL");
    return connection;
  } catch (err) {
    console.error("Error connecting to MySQL:", err);
    throw err;
  }
}
export const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to database: " + error);
  }
};