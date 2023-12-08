const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`Mongodb connected with server: ${data.connection.host}`);
    })
    .catch((err)=>{
      console. log(err)
  })
};

module.exports = connectDatabase;
