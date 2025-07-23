import { NextFunction, Request, Response } from "express";

const mysql = require("mysql2");

export const getHome = async (req: Request, res: Response, next: NextFunction) => {
    console.log("Hit the gethome endpoint");

    const db = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "projectdb",
    });

    const query = "SELECT CompanyInformation.Ticker, CompanyInformation.Name, stock.Close FROM CompanyInformation LEFT JOIN Stock ON CompanyInformation.Ticker = stock.Ticker WHERE stock.Date = (SELECT MAX(Date) FROM Stock WHERE Ticker = CompanyInformation.Ticker)";

    db.query(query, (err: any, results: any) => {
        console.log(results)

        if (results.length == 0) {
            console.log("critical error occured")
        }
        return res.status(200).json({ results });

    });
};
