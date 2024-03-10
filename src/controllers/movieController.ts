import { Request, Response } from "express";
import { validationResult } from "express-validator";
import Movie from "../models/movieModel";

const listMovies = async (req: Request, res: Response) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const searchMovies = async (req: Request, res: Response) => {
  try {
    const { q } = req.query;
    const movies = await Movie.find({
      $or: [
        { title: { $regex: q, $options: "i" } },
        { genre: { $regex: q, $options: "i" } },
      ],
    });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addMovie = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newMovie = new Movie(req.body);
    await newMovie.save();
    res.status(201).json(newMovie);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateMovie = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedMovie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    res.json(updatedMovie);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteMovie = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedMovie = await Movie.findByIdAndDelete(id);
    if (!deletedMovie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    res.json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default {
  listMovies,
  searchMovies,
  addMovie,
  updateMovie,
  deleteMovie,
};
