import mongoose, { Schema, Document } from "mongoose";

export interface Movie extends Document {
  title: string;
  genre: string;
  rating: number;
  streamingLink: string;
}

const movieSchema: Schema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  rating: { type: Number, required: true },
  streamingLink: { type: String, required: true },
});

const Movie = mongoose.model<Movie>("Movie", movieSchema);

export default Movie;
