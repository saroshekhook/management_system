// src/app.ts
import express from "express";
import bodyParser from "body-parser";
import router from "./routes/index";
import { config } from "dotenv";
config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());

// router configs
app.use(router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
