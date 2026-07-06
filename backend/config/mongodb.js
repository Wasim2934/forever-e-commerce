import mongoose from "mongoose";

const connectDB = async () => {
    await mongoose.connect(`${process.env.MONGODB_URI}`)

    console.log('Database connected successfully...');
}

export default connectDB;