import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

import { getPostcodeSuggestions } from './src/getPostcodeSuggestions';

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

app.listen(5000, () => {console.log("server running")});