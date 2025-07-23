import { NextFunction, Request, Response } from "express";
const mysql = require("mysql2");

export const addStockPortfolio = async (req: Request, res: Response, next: NextFunction) => {
    console.log("hit the addstockportfolio endpoint");

    const { ticker, username, portfolioName } = req.body;

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

    console.log(ticker);
    console.log(username);
    console.log(portfolioName);

    const query = "SELECT Id FROM Portfolio WHERE Email = ? AND Name = ?";

    db.query(query, [username, portfolioName], (err: any, results: any) => {
        if (err) {
            console.error("Query error:", err);
            return res.status(500).json({ error: "Query error" });
        }

        if (results.length > 0) {
            const portfolioId = results[0].Id;
            // console.log("Found portfolio ID:", portfolioId);

            const query2 = "INSERT INTO PortfolioItem (PortfolioId, Ticker) VALUES (?, ?)";
            db.query(query2, [portfolioId, ticker], (err: any, insertResults: any) => {
                if (err) {
                    console.error("Insert error:", err);
                    return res.status(500).json({ error: "Error adding stock to portfolio" });
                }

                console.log("Added ticker to portfolio successfully");
                return res.status(200).json({
                    message: "Stock added to portfolio",
                    portfolioItemId: insertResults.insertId,
                });
            });
        } else {
            console.log("No portfolio found for given user + name");
            return res.status(404).json({ error: "Portfolio not found" });
        }
    });
};
