import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

import { getNearestLocations } from './src/getNearestLocations';
import { getPostcodeSuggestions } from './src/getPostcodeSuggestions';
import { getProductAvailability } from './src/getProductAvailability';

const app = express();

app.use(bodyParser.json());

app.get("/api/getPostcodeSuggestions", async (req: Request, res: Response) => {
    const query = req.query.query as string;

    try {
        const result = await getPostcodeSuggestions(query);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to get postcode suggestions"
        });
    }
});

app.get("/api/getProductAvailability", async (req: Request, res: Response) => {
    const productSKU = req.query.productSKU as string;
    const postcode = req.query.postcode as string;

    try {
        const result = await getProductAvailability(productSKU, postcode);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to get product availability"
        });
    }
});

app.get("/api/getNearestLocations", async (req: Request, res: Response) => {
    const lat = req.query.lat as string;
    const lon = req.query.lon as string;
    const distance = req.query.distance as string;

    try {
        const result = await getNearestLocations(lat, lon, distance);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to get nearest locations"
        });
    }
});

app.listen(5000, () => {console.log("server running")});