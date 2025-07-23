import express from "express";
import { login } from "./login";
import { signup } from "./signup";
import { logout } from "./logout"

const router = express.Router({ mergeParams: true });

const mysql = require('mysql2');


//test post
router.get(
    "/test",
    (req, res) => {
        console.log('test here')
        res.status(200).json({ "test": "world" })

        const con = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'projectdb'
          });
  

        con.connect(function (err) {
            if (err) throw err;
            console.log("Connected to mysql succesfully");
        });


    }
)

router.post(
    "/signup",
    signup
)

router.post(
    "/login",
    login
)

router.post(
    "/logout",
    logout
)



export { router as authEndpoints }