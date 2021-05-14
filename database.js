import mongoose from  "mongoose" ;

const Connection = async ()=>{
try {
    const conn = await mongoose.connect(process.env.DATABASE_URI,{
        useNewUrlParser:true,
        useFindAndModify:true,
        useUnifiedTopology:true
    })
    console.log(`database connected:${conn.connection.host}`);
} catch (err) {
    console.log(err);
    process.exit(1)
}

}

export default Connection