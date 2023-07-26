import mongoose from "mongoose";

let isConnected = false; // track the connection

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is alredy connected");
    return;
  } else {
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        dbName: "share_prompt",
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      isConnected = true;
      console.log("MongoDB conected");
    } catch (error) {
      console.log(error);
    }
  }
};
