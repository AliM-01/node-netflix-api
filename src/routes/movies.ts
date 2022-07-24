import express, { Request, Response } from 'express'
import { isAuthenticated, isAdmin } from '@utils';
import { MovieModel } from '@models';

const router = express.Router();

// GET /api/movies/all
router.get("/all", isAuthenticated, isAdmin, async (req: Request, res: Response) => {

    try {

        const movies = await MovieModel.find().sort({ _id: -1 }).limit(25);

        res.status(200).json(movies);;

    } catch (err) {
        res.status(500).json(err);
    }
});

// GET /api/movies/:id
router.get("/find/:id", isAuthenticated, async (req: Request, res: Response) => {

    try {

        const movie = await MovieModel.findById(req.params.id);

        res.status(200).json(movie);;

    } catch (err) {
        res.status(500).json(err);
    }
});

// GET /api/movies/random
// GET /api/movies/random?type=movie
// GET /api/movies/random?type=series
router.get("/random/:type", isAuthenticated, async (req: Request, res: Response) => {

    const type = req.query.type;

    try {

        let randomMovie;

        if (type === "series") {
            randomMovie = MovieModel.aggregate([
                { $match: { isSeries: true } },
                { $sample: { size: 1 } }
            ])
        } else {
            randomMovie = MovieModel.aggregate([
                { $match: { isSeries: false } },
                { $sample: { size: 1 } }
            ])
        }
        res.status(200).json(randomMovie);

    } catch (err) {
        res.status(500).json(err);
    }
});

// POST /api/movies
router.post("/", isAuthenticated, isAdmin, async (req: Request, res: Response) => {

    if (!req.body)
        res.status(400);

    try {

        const movie = new MovieModel(req.body);

        const savedMovie = await movie.save();

        res.status(201).json({
            id: savedMovie.id
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

// PUT /api/movies/:id
router.put("/:id", isAuthenticated, isAdmin, async (req: Request, res: Response) => {

    if (!req.body)
        res.status(400);

    try {

        await MovieModel.findByIdAndUpdate(req.params.id,
            { $set: req.body }, { new: true });

        res.status(200).json({ message: "Movie updated !" });

    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE /api/movies/:id
router.delete("/:id", isAuthenticated, isAdmin, async (req: Request, res: Response) => {

    try {

        await MovieModel.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "Movie deleted !" });;

    } catch (err) {
        res.status(500).json(err);
    }
});

export { router as moviesRouter };