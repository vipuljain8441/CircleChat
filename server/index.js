import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import path from "path";

//security packages
import helmet from "helmet";
import connectdb from "./dbconfig/index.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import router from "./routes/index.js";

//configure .env
dotenv.config();

const app = express();
const PORT = process.env.PORT | 8800;

const __dirname = path.resolve(path.dirname(""));
app.use(express.static(path.join(__dirname, "views/build")));
//connection established to database
await connectdb();

//Use helmet!
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(router);

//Middleware
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Dev Sever running on port:${PORT}`);
});
