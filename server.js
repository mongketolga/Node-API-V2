require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const productRoute = require("./routes/productRoute");
const errorMiddleware = require("./middleware/errorMiddleware");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGODB_URL;
const FRONTEND = process.env.FRONTEND;

const corsOptions = {
  origin: FRONTEND,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/products", productRoute);

app.get("/", (req, res) => {
  throw new Error("fake error");
});

app.use(errorMiddleware);

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("Connected to the Mongo DB");
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
