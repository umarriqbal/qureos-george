const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

const PORT = process.env.SERVER_PORT;

// Routes.
const homeRouter = require("./routes/home");
const memberRouter = require("./routes/member");
const searchRouter = require("./routes/search");

// DB.
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true }, () =>
  console.log("Connected to DB.")
);

// Middlewares.
app.use(cors());
app.use(express.json());

// Route middlewares.
app.use("/api", homeRouter);
app.use("/api/member", memberRouter);
app.use("/api/search", searchRouter);

app.listen(PORT, () => console.log(`Listening on express server: ${PORT}`));
