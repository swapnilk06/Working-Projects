import mongoose from "mongoose";

const db = async () => {
  mongoose.connection.on("connected", () =>
    console.log("MongoDB Database Connected")
  );

  await mongoose.connect(`${process.env.MONGODB_URL}/authentication_system_db`);
};

export default db;
