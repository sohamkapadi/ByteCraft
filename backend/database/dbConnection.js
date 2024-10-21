import mongoose from "mongoose";

export const dbConnection =()=>{
    mongoose.connect(process.env.MONGO_DB_URL,{
        dbName:"BYTECRAFT",
    }).then(()=>{
        console.log("Connected to MongoDB");
    }).catch((err)=>{
        console.log("Some error occured while connecting to database:",err);
    });
};
