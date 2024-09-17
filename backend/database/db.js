import mongoose from "mongoose";
const Connection =async (userName, passWord) =>{
    const URL=`mongodb+srv://${userName}:${passWord}@blogapp.jimxj.mongodb.net/`;
    try{
        await mongoose.connect(URL);
        console.log("Mongodb database connection successful");
    }catch(error){
        console.log("Error while connecting with the database",error);
    }
    
}
export default Connection;