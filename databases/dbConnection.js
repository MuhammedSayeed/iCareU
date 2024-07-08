import mongoose from "mongoose";

export function dbConnection (){
    mongoose.connect(process.env.DB_CONNECTION_OFFLINE).then(()=>{
        console.log("database connection established")
    })
}