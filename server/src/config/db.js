const mongoose = require("mongoose");

function connectDB() {
  //const url = "mongodb://localhost:27017/urlShortener";
  const url =
    "mongodb+srv://alitalha823:2302aydin@cluster0.o3lsimp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

  try {
    mongoose.connect(url);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
  const dbConnection = mongoose.connection;
  dbConnection.once("open", (_) => {
    console.log(`Database connected: ${url}`);
  });

  dbConnection.on("error", (err) => {
    console.error(`connection error: ${err}`);
  });
  return;
}

module.exports = connectDB;
