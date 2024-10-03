import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

import { getPostcodeSuggestions } from './src/getPostcodeSuggestions';

const app = express();

app.use(bodyParser.json());

app.get("/api/getPostcodeSuggestions", async (req: Request, res: Response) => {
    const query = req.query.query as string;

    try {
        const result = await getPostcodeSuggestions(query);
        //console.log(result);
        res.status(200).json(result);
    } catch (error) {
        res.status(200).json({"list": ["abc"]});
    }
});

app.listen(5000, () => {console.log("server running")});