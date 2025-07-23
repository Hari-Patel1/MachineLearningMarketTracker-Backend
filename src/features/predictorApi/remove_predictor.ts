import { NextFunction, Request, Response } from "express";
import mysql from "mysql2";

export const removePredictor = async (req: Request, res: Response, next: NextFunction) => {
    console.log("hit the removepredictor endpoint");

    const { Id } = req.body;

    const db = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "projectdb",
    });

    console.log(req.body);
    console.log(Id);

    const query = "DELETE FROM PredictorItem WHERE Id = ?";
    const values = [Id];

    db.query(query, values, (err: any, results: any) => {
        if (err) {
            console.error("Error removing predictor:", err);
            return res.status(500).json({ error: "Error removing predictor" });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: "Predictor not found" });
        }

        res.status(200).json({ message: "Predictor removed" });
    });
};
