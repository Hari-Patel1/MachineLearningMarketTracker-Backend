// import { NextFunction, Request, Response } from "express";
// const mysql = require("mysql2");

// export const loadStockData = async (req: Request, res: Response, next: NextFunction) => {
//     console.log("Hit the loadStockData endpoint")

//     const { ticker } = req.body

//     const db = mysql.createConnection({
//         host: "localhost",
//         user: "root",
//         password: "root",
//         database: "projectdb",
//     });

//     const query = "SELECT * FROM stock WHERE Ticker = ?";

//     db.query(query, [ticker], (err: any, results: any) => {
//         if (results.length > 0) {
//             console.log("Got data");
//             return res.status(200).json({ results });

//         } else {
//             console.log("Cant find data");
//             return res.status(401).json({});
//         }
//     });
// };


import { NextFunction, Request, Response } from "express";
const mysql = require("mysql2");

export const loadStockData = async (req: Request, res: Response, next: NextFunction) => {
  console.log("Hit the loadStockData endpoint");

  const { ticker } = req.body;

  const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "projectdb",
  });

  // This assumes your stock table includes date and close fields for historical prices
  // const query = "SELECT Date, Close FROM stock WHERE Ticker = ? ORDER BY Date ASC";

  const query = "SELECT Date, Open, High, Low, Close FROM stock WHERE Ticker = ? ORDER BY Date ASC";
  
  db.query(query, [ticker], (err: any, results: any) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({});
    }

    if (results.length > 0) {
      // Transform data into history format
      const history = results.map((row: any) => ({
        date: row.Date.toISOString().split("T")[0], // or any date format you like
        close: parseFloat(row.Close),
      }));

      return res.status(200).json({ history });
    } else {
      console.log("Can't find data");
      return res.status(404).json({});
    }
  });
};
