const mongoose = require("mongoose");
// URI

// Connect MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://dabin:Ekqls156508@dbdb-shard-00-00.kwjm7.mongodb.net:27017,dbdb-shard-00-01.kwjm7.mongodb.net:27017,dbdb-shard-00-02.kwjm7.mongodb.net:27017/?ssl=true&replicaSet=atlas-7lkyvb-shard-0&authSource=admin&retryWrites=true&w=majority', {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log("MongoDB Connected...");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;