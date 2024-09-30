require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDb = require("./config/connectDb");
const songRoutes = require("./routes/songRoute");
const artistRoutes = require("./routes/artistRoute");

const app = express();
app.use(express.json());
app.use(cors());
connectDb();
app.use("/api/song", songRoutes);
app.use("/api/artist", artistRoutes);

app.get("/", (req, res) => {
  res.send("Home Router");
});

app.listen(process.env.PORT || 3000, (req, res) => {
  console.log("Server Started");
});
