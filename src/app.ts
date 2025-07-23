import express, { Express } from "express";
import { authApi } from "./features/authApi/index";
import { portfolioApi } from "./features/portfolioApi/index";
import { homeApi } from "./features/homeApi/index";
import { stockApi } from "./features/stockApi";
import { settingsApi } from "./features/settingsApi";
import { predictorApi } from "./features/predictorApi";
import { Stock } from "./features/stockApi/stock";

// Schedulers
import cron from "node-cron";
import { exec } from "child_process"
import { error } from "console";
import { stderr, stdout } from "process";

const mysql = require("mysql2");

export class App {
    private readonly app = express();

    constructor(app: Express) {
        this.app = app;
        this.app.use(express.json());
        this.app.use(authApi);
        this.app.use(portfolioApi);
        this.app.use(homeApi);
        this.app.use(stockApi);
        this.app.use(settingsApi);
        this.app.use(predictorApi);
    }

    async start() {
        const server = this.app.listen(parseInt(process.env.PORT!), () => {
            console.log(`Listening on port ${process.env.PORT}`);
        });

        const db = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "root",
            database: "projectdb",
        });

        db.connect((err: Error) => {
            if (err) throw err;
            console.log("Connected to projectdb");
        });


        // scheduling the stock data job to execute at a certain time using cron
        cron.schedule("0 0 * * *", async () => {
            console.log("Scheduled job for midnight");
            const stockJob = new Stock();
            await stockJob.start();
        })

        // also "schedule" it for when the server boots up initially
        const stockJob = new Stock();
        await stockJob.start();

        console.log("Started the machine learning process...")

        // scheduling the machine learning job to execute at a certain time using cron
        cron.schedule("0 0 * * *", () => {
            exec(
                'python -u "C:/dev/projects/a_level_shares_backend/src/features/predictorApi/predictor.py"',
                (error, stdout, stderr) => {
                    if (error) {
                        console.error("Error running Python predictor.py: ", error.message);
                        return;
                    }
                    if (stderr) {
                        console.error("predictor.py stderr: ", stderr);
                    }
                    console.log("predictor.py output: ", stdout);
                }
            );
        });

        // Run machine learning job immediately on startup (once)
        exec(
            'python -u "C:/dev/projects/a_level_shares_backend/src/features/predictorApi/predictor.py"',
            (error, stdout, stderr) => {
                if (error) {
                    console.error("Error running Python predictor.py at startup: ", error.message);
                    return;
                }
                if (stderr) {
                    console.error("predictor.py stderr at startup: ", stderr);
                }
                console.log("predictor.py output at startup: ", stdout);
            }
        );
    }
}