const mongoose=require('mongoose');
const mongoURI="mongodb://localhost:27017/"

const connectToMongo=async ()=>{
    try{
    await mongoose.connect(mongoURI);
    console.log("connected to database successfully");
    }
    catch(error)
    {
        console.log("not connected");
    }
    
}
module.exports=connectToMongo;
