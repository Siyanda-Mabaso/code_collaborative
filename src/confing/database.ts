import { Pool } from "pg"
import dotenv from "dotenv"
// import { execPath } from "node:process";
// import { text } from "node:stream/consumers";

dotenv.config()
// library to pull all this data its h
 const pool =new Pool({
    user: process.env.DB_USER,
    host: process.env.DB__HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || "5432"),
 });

export const query =(text: string, params?: any[])=> pool.query(text,params)

export const testDbConnection = async () =>{
   try{
      const client = await pool.connect()
      console.log ('Database connection succesfull')
      client.release()
   }catch (error){
   console.error('unable to connect to database',error);
   process.getMaxListeners();
}
}