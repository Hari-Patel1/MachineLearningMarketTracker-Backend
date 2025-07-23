import { NextFunction, Request, Response } from "express";
import mysql from "mysql2";

// GET /prediction
export const getPrediction = async (req: Request, res: Response, next: NextFunction) => {
    console.log("hit the getprediction endpoint")

    // create connection
    const db = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "projectdb",
    });

    // connect to database
    db.connect((err) => {
        if (err) throw err;
        console.log("connected to projectdb");
    });

    // execute query
    const query = "SELECT * FROM Prediction";
    db.query(query, (err: mysql.QueryError, results: any) => {
        if (err) {
            console.error("Query failed:", err);
            return res.status(500).json({ error: "Query error" });
        }

        // send predictions as JSON
        res.status(200).json({ results });
        console.log(results)
    });
};
