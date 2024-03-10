import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import movieRoutes from "./routes/movieRoutes";

const app = express();
const PORT = 3000;

mongoose.connect(
  "mongodb+srv://itsrkator:Z0351$AlPhA@mean-app-cluster.i9uxcni.mongodb.net/movies"
);

app.use(bodyParser.json());
app.use("/movies", movieRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
