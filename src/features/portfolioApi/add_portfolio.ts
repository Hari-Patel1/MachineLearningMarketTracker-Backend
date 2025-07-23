import { NextFunction, Request, Response } from "express"
const mysql = require("mysql2");

export const addPortfolio = async (req: Request, res: Response, next: NextFunction) => {
    console.log("hit the addportfolio endpoint")
    // console.log(req.headers) to confirm the request type and debug

    console.log(req.body)

    //slplit the payload agan but thistime for the portfolio and username
    //portfolio id does not need to be specified as it is an auto incremented int
    const { portfolioName, username } = req.body;

    //ping the db
    const db = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "projectdb",
    });


    db.connect(
        (err) => {
            if (err) throw err;
            console.log("connected to projectdb")
        }
    )

    console.log(portfolioName);
    console.log(username);

    const query = "INSERT INTO portfolio (Name, Email) VALUES (?, ?)";
    const values = [portfolioName, username];

    db.query(query, values, (err: any, results: any) => {
        if (err) {
            console.error("Error inserting user:", err);
            return res.status(500).json({ error: "Error inserting user" });
        }

        res.status(201).json({ message: "User inserted", userId: results.insertId });
    })
    
}
