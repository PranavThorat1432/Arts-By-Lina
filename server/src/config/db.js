import mongoose from "mongoose";

//MongoDB Connection
const connectDB = async () => {
    const mongoURI = process.env.MONGODB_URL || process.env.MONGODB_URI;
    if (!mongoURI) {
        console.error("MongoDB connection error: Neither MONGODB_URL nor MONGODB_URI is defined in the environment.");
        process.exit(1);
    }
    try {
        await mongoose.connect(mongoURI, {
            dbName: "Arts_By_Lina"
        });
        console.log("MongoDB Connected..!");
    } catch (err) {
        console.error("MongoDB Connection Failed:", err);
        process.exit(1);
    }
};

export default connectDB;