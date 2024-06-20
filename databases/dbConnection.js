import mongoose from "mongoose";

export function dbConnection (){
    mongoose.connect(process.env.DB_CONNECTION).then(()=>{
        console.log("database connection established")
    })
}