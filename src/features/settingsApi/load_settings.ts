import { NextFunction, Request, Response } from "express"

const mysql = require("mysql2");

export const loadSettings = async (req: Request, res: Response, next: NextFunction) => {
    console.log("hit the loadsettings endpoint")

    
    const { username , themeMode} = req.body;

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

    console.log(username);
    console.log(themeMode);

    const query = "INSERT INTO settings (Email, Language, Theme) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE Language = VALUES(Language), Theme = VALUES(Theme)";
    const values = [username, "", themeMode]
    db.query(query, values, (err: any, results: any) => {
        if (err) {
            console.error("Error inserting settings:", err);
            return res.status(500).json({ error: "Error inserting settings" });
        }

        res.status(201).json({ message: "Settings inserted", userId: results.insertId });
    })

};