import express, { Express } from "express";
import yahooFinance from "yahoo-finance2";

const mysql = require("mysql2");

export class Stock {
    async start() {
        console.log("Stock schedule executing")


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

        const tickers = ["AAPL", "TSLA", "GOOGL", "AMZN", "MSFT", "NVDA"];

        for (const ticker of tickers) {
            try {
                await this.fetchAndInsertStockData(db, ticker);
                await this.fetchAndInsertCompanyInfo(db, ticker);
            } catch (error) {
                console.error(`Failed to retrieve data for ${ticker}:`, error);
            }
        }
    }

    private async fetchAndInsertStockData(db: any, ticker: string) {
        const queryOptions = {
            period1: "2015-01-01",
            period2: new Date().toISOString().split("T")[0]
        };

        const result = await yahooFinance.chart(ticker, queryOptions);

        for (const quote of result.quotes) {
            const stockQuery = `
                    INSERT INTO stock (Ticker, Date, Open, High, Low, Close, Volume)
                    VALUES (?, ?, ?, ?, ?, ?, ?)
                `;

            const stockValues = [
                ticker,
                new Date(quote.date).toISOString().slice(0, 10),
                quote.open,
                quote.high,
                quote.low,
                quote.close,
                quote.volume
            ];

            db.query(stockQuery, stockValues, (err: Error) => {
                if (err) {
                    console.error(`Error inserting stock data for ${ticker}:`, err);
                } else {
                    console.log(`Inserted stock data for ${ticker} on ${stockValues[1]}`);
                }
            });
        }
    }

    private async fetchAndInsertCompanyInfo(db: any, ticker: string) {
        const companyData = await yahooFinance.quoteSummary(ticker, { modules: ["price"] });

        if (companyData?.price?.longName) {
            const companyName = companyData.price.longName;

            const companyQuery = `
                    INSERT INTO companyinformation (Ticker, Name)
                    VALUES (?, ?)
                `;

            const companyValues = [ticker, companyName];

            db.query(companyQuery, companyValues, (err: Error) => {
                if (err) {
                    console.error(`Error inserting company info for ${ticker}:`, err);
                } else {
                    console.log(`Inserted company info for ${ticker}: ${companyName}`);
                }
            });
        } else {
            console.warn(`No company name found for ${ticker}`);
        }
    }
}
