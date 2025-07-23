import { NextFunction, Request, Response } from "express"
const mysql = require("mysql2");

export const removePortfolio = async (req: Request, res: Response, next: NextFunction) => {
    console.log("hit the removeportfolio endpoint")
    // console.log(req.headers) to confirm the request type and debug

    console.log(req.body)

    //slplit the payload agan but thistime for the portfolio and username so we know what we are removing from the database
    //portfolio id does not need to be as we can add validation (TODO) WHICH CAN STOP USERS FROM INPUTTING PORTFOLIOS WITH THE SAME NAME
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

    const query = "DELETE FROM portfolio  WHERE Name = (?) AND Email = (?)";
    const values = [portfolioName, username];

    db.query(query, values, (err: any, results: any) => {
        if (err) {
            console.error("Error removing portfolo:", err);
            return res.status(500).json({ error: "Error removing portfolio" });
        }

        res.status(200).json({ message: "Portfolio removed", userId: results.insertId });
    })
}
