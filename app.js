import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connect.js";
dotenv.config();
import "express-async-errors";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import notFound from "./middleware/not-found.js";
import morgan from "morgan";
import router from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();

app.use(morgan("tiny"));
app.use(express.json());
//adding jwt_secret to cookiepareser- we r signing our cookies now
app.use(cookieParser(process.env.JWT_SECRET));

app.get("/", (req, res) => {
  res.send("e-commerce api");
});

app.get("/api/v1", (req, res) => {
  console.log(req.signedCookies);
  res.send("e-commerce api");
});

//app.use("/api/v1/auth", router);

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);



//put error handling middleware below all routes
app.use(errorHandlerMiddleware);
app.use(notFound);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
