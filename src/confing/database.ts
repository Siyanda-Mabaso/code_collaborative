import { Pool } from "pg"
import dotenv from "dotenv"

dotenv.config();
import { createUserTable } from "../services/userServices"
// import { execPath } from "node:process";
// import { text } from "node:stream/consumers";

const database = process.env.DB_NAME;
if (!database) {
  console.warn("⚠️ WARNING: DB_DATABASE is not defined in .env! Falling back to default 'postgres' database.");
}
console.log(database)
// library to pull all this data its 
 const pool =new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT || 5432),
 });
 console.log()

export const query =(text: string, params?: any[])=> pool.query(text,params)

export const testDbConnection = async () =>{
   try{
      
      // const client = await pool.connect()
      const res = await pool.query('SELECT NOW()')
      console.log (`Database connection succesfull "${res.rows[0].current_database}"`)
      // client.release()
   }catch (error){
   console.error('unable to connect to database',error);
   process.getMaxListeners();
}
}

export const dbCheckTables = async() =>{
   await testDbConnection()
    await createUserTable()
}