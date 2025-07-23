import { NextFunction, Request, Response } from "express"
import yahooFinance from 'yahoo-finance2';
yahooFinance.suppressNotices(['yahooSurvey'])

const mysql = require("mysql2");

export const loadPortfolio = async (req: Request, res: Response, next: NextFunction) => {
    console.log("hit the loadportfolio endpoint")

    const { username } = req.body;

    const db = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "projectdb",
    });

    console.log(username);

    //find all portfolios which assosoate the user to a portfolio
    //we can then send this payload back to the frontend to be parsed
    const query = "SELECT * FROM portfolio WHERE email = ?";

    // require syntax (if your code base does not support imports)


    db.query(query, [username], (err: any, results: any) => {
        console.log(results)

        if (results.length == 0) {
            console.log("No portfolios found")
        }
        return res.status(200).json({ results });

    });
};