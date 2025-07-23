import { NextFunction, Request, Response } from "express"

const mysql = require("mysql2");


export const loadPredictor = async (req: Request, res: Response, next: NextFunction) => {
    console.log("hit the loadpredictor endpoint")

    const { username } = req.body;

    const db = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "projectdb",
    });

    console.log(username);

    //now because there are no seperate classes per portfolio we can utalise a very simplistic query here compared to the others:
    const query = "SELECT * FROM predictorItem WHERE email = ?";
    db.query(query, [username], (err: any, results: any) => {
        console.log(results)

        if (results.length == 0) {
            console.log("No predictor items found")
        }
        return res.status(200).json({ results });

    });
}