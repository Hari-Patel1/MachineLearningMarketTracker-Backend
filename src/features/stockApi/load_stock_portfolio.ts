import { NextFunction, Request, Response } from "express";
const mysql = require("mysql2");

export const loadstockportfolio = async (req: Request, res: Response, next: NextFunction) => {
    console.log("hit the loadstockportfolio endpoint");

    const { username, portfolioName } = req.body

    console.log(username)
    console.log(portfolioName)

    const db = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "projectdb",
    });

    db.connect(
        (err) => {
            if (err) throw err;
            console.log("connected to projectdb");
        }
    );

    const query = "SELECT Id FROM Portfolio WHERE Email = ? AND Name = ?";

    db.query(query, [username, portfolioName], (err: any, results: any) => {
        if (err) {
            console.error("Query error:", err);
            return res.status(500).json({ error: "Query error" });
        }
        if (results.length > 0) {
            const portfolioId = results[0].Id
            const query2 = "SELECT * FROM PortfolioItem WHERE PortfolioId = ?"
            db.query(query2, [portfolioId], (err: any, results: any) => {
                if (err) {
                    console.error("Insert error:", err);
                    return res.status(500).json({ error: "Error finsing stocks" });
                }
                if (results.length > 0) {
                    console.log(results)
                    return res.status(200).json({ results })

                }
            })
        }
    })

    // res.status(200).json({})
};
