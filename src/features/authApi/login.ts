import { NextFunction, Request, Response } from "express";
const mysql = require("mysql2");

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("hit the login endpoint");

  const { username, password } = req.body;

  const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "projectdb",
  });

  console.log(username);
  console.log(password);

  const query = "SELECT * FROM user WHERE email = ? AND password = ?";

  db.query(query, [username, password], (err: any, results: any) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length > 0) {
      console.log("User authenticated");

      // fetch settings
      const query2 = "SELECT Theme FROM settings WHERE Email = ? LIMIT 1";
      db.query(query2, [username], (err2: any, settingsResults: any) => {
        if (err2) {
          console.error("Error getting settings:", err2);
          return res.status(500).json({ error: "Error fetching settings" });
        }

        let theme = "system"; // default fallback
        if (settingsResults.length > 0) {
          theme = settingsResults[0].Theme;
        }

        return res.status(200).json({
          message: "User authenticated",
          username: username,
          theme: theme,
        });
      });
    } else {
      console.log("User not authenticated");
      return res.status(401).json({ message: "Invalid credentials" });
    }
  });
};
