const express = require("express")
const bodyParser = require('body-parser')
const errorHandler = require("./middleware/errorHandling.js")
const connectDb = require("./db/dbconfig")
const Cors = require("cors");
connectDb();
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());      //using json for post requests
app.use("/api/list",require("./routes/contactroutes.js"))    //using this route for api testing
app.use("/api/users",require("./routes/userRoutes"))
app.use(errorHandler);
app.use(Cors());
app.listen(4000,()=>{
console.log("Hello at 4000")
})