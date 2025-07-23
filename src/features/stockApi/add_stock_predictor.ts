import { NextFunction, Request, Response } from "express"

const mysql = require("mysql2");


export const addStockPredictor = async (req: Request, res: Response, next: NextFunction) => {
    console.log("hit the addstockpredictor endpoint")

    const { ticker, username } = req.body

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

    const query = "INSERT INTO PredictorItem (Ticker, Email) VALUES (?, ?)"

    db.query(query, [ticker, username], (err: any, insertResults: any) => {
    if (err) {
      // Check for duplicate error. in this instance we can return the 200 because we know that the user has already inserted that entry into the predictor
      //This way we can handle silently and hide the error from the user
      if (err.code === "ER_DUP_ENTRY") {
        console.log("Stock already exists in predictor, handle silently");
        return res.status(200).json({
          message: "Stock already exists in predictor",
        });
      } else {
        console.error("Insert error:", err);
        return res
          .status(500)
          .json({ error: "Error adding stock to predictor" });
      }
    }

    console.log("Added ticker to predictor successfully");
    return res.status(200).json({
      message: "Stock added to predictor",
      predictorItemId: insertResults.insertId,
    });
  });
    console.log(ticker)
    console.log(username)

}

