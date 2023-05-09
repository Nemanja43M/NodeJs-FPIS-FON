const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const mongoose = require("mongoose");
const app = require("./app");
/////////Conection to DB////////////////
mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    retryWrites: false
  })
  .then(() => console.log("Connected to the DB"));
/////////////////////////////////////////////////////

//////////////////Server/////////////////////////////////
const port = 3000;
app.listen(port, (req, res) => {
  console.log(`App is running on port ${port}`);
});
