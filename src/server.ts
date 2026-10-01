import express  from "express";
import dotenv from "dotenv"
import { testDbConnection } from "./confing/database";
import userRoutes from "./routes/userRoutes"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json());

const startServer = async ()=>{
    await testDbConnection()

    app.use("/api/users",userRoutes)
    app.listen(PORT,()=>{
        console.log(`Server is running on http://localhost:${PORT}`);
    });
};
startServer();