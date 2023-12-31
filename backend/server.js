const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");


// Handling Uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to  Uncaught exception`);
  process.exit(1);
});


//config
dotenv.config({ path: "./config/config.env" });

// connecting to database
connectDatabase();



const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});



process.on("unhandledRejection", (err) => {
  console.log(`Error:${err}`);
  console.log(`Shutting down server due to unhandled promise rejection`);

  server.close(() => {
    process.exit(1);
  });
});
