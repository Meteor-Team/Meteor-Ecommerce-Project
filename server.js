import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./db/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";
import edukaanRoutes from "./routes/edukaanRoutes.js"

import {fileURLToPath} from "url";
//configure env
dotenv.config({path : './config.env'});

//databse config
connectDB();
//rest object
const app = express();

//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/edukaan", edukaanRoutes);

//rest api
app.get("/",(req,res) => {
  res.sendStatus("hi")
});

//PORT
const PORT = process.env.PORT || 8000;


if(process.env.NODE_ENV == 'production'){
app.use(express.static("client/build"));

}
//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on doc mode on port ${PORT}`
  );
});
