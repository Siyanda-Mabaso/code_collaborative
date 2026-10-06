import express  from "express";
import dotenv from "dotenv"
import { dbCheckTables } from "./confing/database";
import userRoutes from "./routes/userRoutes"
import projectRoutes from"./routes/projectRoutes"


dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json());

const startServer = async ()=>{
    await dbCheckTables()
    app.use("/api",userRoutes)
    app.use("/api",projectRoutes)
    app.listen(PORT,()=>{
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}; 
startServer();