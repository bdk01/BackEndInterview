import express from 'express'

import cors from "cors";

import 'dotenv/config';
import appRouter from './routes';

import fileUpload from "express-fileupload";
import connectToMongo from "./config/connectDB";
import bodyParser from 'body-parser';

const app = express();
const corsOptions = {
  credentials: true,
  origin: `${process.env.DEPLOY_FE_URL}`,
  optionSuccessStatus: 200,
};
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
/* app.use(cors(corsOptions)); */
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
app.use(appRouter)

const PORT = process.env.PORT || 8000;
let PORT1 =  process.env.PORT
console.log(PORT1)
app.listen(PORT, async () => {
  await connectToMongo();
  console.log(`Server is running on http://localhost:${PORT}.`)
/*   logger.info(`Server is running on http://localhost:${PORT}.`); */
});
