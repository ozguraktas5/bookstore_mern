import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());

app.use(
  cors({
    origin: "https://bookstore-mern-api.vercel.app/",
    methods: ["GET", "POST", "PUT", "DELETE"],
    
    
  })
);

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("server running");
});

app.use("/books", booksRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
