import mongoose from "mongoose";
const Connection = async () => {
    try {
        const DB = process.env.DATABASE_URI.replace('<password>',process.env.DATABASE_PASSWORD)
        const conn = await mongoose.connect(DB, {
            useNewUrlParser: true,
            useFindAndModify: true,
            useUnifiedTopology: true
        })
        console.log(`database connected: ${conn.connection.name}`);
    } catch (err) {
        console.log(err);
        process.exit(1)
    }

}

export default Connection