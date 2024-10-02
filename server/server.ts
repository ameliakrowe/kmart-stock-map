import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

import { getPostcodeSuggestions } from './src/getPostcodeSuggestions';

const app = express();

app.use(bodyParser.json());

app.get("/api/getPostcodeSuggestions", (req: Request, res: Response) => {
    const query = req.query.query as string;

    const result = getPostcodeSuggestions(query);

    res.status(200).json({"list": [result]});
});

app.listen(5000, () => {console.log("server running")});