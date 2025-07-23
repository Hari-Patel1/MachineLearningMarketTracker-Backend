import { NextFunction, Request, Response } from "express";
import mysql from "mysql2";

export const removeStockPortfolio = async (req: Request, res: Response, next: NextFunction) => {
    console.log("hit the removestockportfolio endpoint");

    const { username, portfolioName, Id } = req.body;
    console.log(username, portfolioName, Id);

    const db = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "projectdb",
    });

    const query = "DELETE FROM portfolioItem WHERE Id = ?";
    const values = [Id];

    db.query(query, values, (err, results) => {
        if (err) {
            console.error("Error deleting stock:", err);
            return res.status(500).json({ error: "Error deleting stock" });
        }

        res.status(200).json({ message: "Stock deleted successfully" });
    });
};
