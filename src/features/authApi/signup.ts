import { NextFunction, Request, Response } from "express"

const mysql = require("mysql2");


export const signup = async (req: Request, res: Response, next: NextFunction) => {
  console.log("hit the signup endpoint");

  // console.log(req.body)
  //spltiit the http payload body into username and password:
  const { username, password } = req.body;

  //ping the db
  const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "projectdb",
  });

  db.connect((err) => {
    if (err) throw err;
    console.log("connected to projectdb");
  });

  //TODO: ANY ERROR HANDLING LIKE 501 ERRORS AND OTHERWISE
  const query = "INSERT INTO user (Email, Password) VALUES (?, ?)";
  const values = [username, password];

  db.query(query, values, (err: any, results: any) => {
    if (err) {
      console.error("Error inserting user:", err);
      return res.status(500).json({ error: "Error inserting user" });
    }

    return res.status(200).json({
      message: "User inserted",
      userId: results.insertId,
    });
  });
};
