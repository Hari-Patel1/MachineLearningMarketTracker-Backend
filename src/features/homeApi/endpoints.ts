import express from "express";
import { getHome } from "./get_home";


const router = express.Router({ mergeParams: true });

const mysql = require('mysql2');


router.get(
    "/test",
    (req, res) => {
        console.log("test endpint hti")

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

router.get(
    "/get",
    getHome
)



export { router as homeEndpoints }