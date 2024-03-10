import express from "express";
import { check, validationResult } from "express-validator";
import movieController from "../controllers/movieController";

const router = express.Router();

router.get("/", movieController.listMovies);

router.get("/search", movieController.searchMovies);

router.post(
  "/",
  [
    check("title").notEmpty().withMessage("Title is required"),
    check("genre").notEmpty().withMessage("Genre is required"),
    check("rating").isNumeric().withMessage("Rating must be a number"),
    check("streamingLink").isURL().withMessage("Invalid streaming link"),
  ],
  movieController.addMovie
);

router.put(
  "/:id",
  [
    check("rating")
      .optional()
      .isNumeric()
      .withMessage("Rating must be a number"),
    check("streamingLink")
      .optional()
      .isURL()
      .withMessage("Invalid streaming link"),
  ],
  movieController.updateMovie
);

router.delete("/:id", movieController.deleteMovie);

export default router;
