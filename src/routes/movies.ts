import express, { Request, Response } from 'express'
import { isAuthenticated, isAdmin } from '@utils';
import { MovieModel } from '@models';

const router = express.Router();

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

export { router as moviesRouter };