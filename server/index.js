require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./router");
const cors = require("cors");

const PORT = process.env.PORT || 3001;
const corsConfig = {
  credentials: true,
  origin: process.env.CORS_ORIGIN,
};

app.use(cors(corsConfig));
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT} !! `);
});
