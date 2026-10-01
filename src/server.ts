import express  from "express";
import dotenv from "dotenv"
import { testDbConnection } from "./confing/database";

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

const startServer = async ()=>{
    await testDbConnection()

    app.listen(PORT,()=>{
        console.log(`Server is running on http://localhost:${PORT}`);
    });
};
startServer();