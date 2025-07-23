// index.ts
import express from "express";
import dotenv from "dotenv";
import { App } from "./app";

dotenv.config();

// Initialize express app
const expressApp = express();

// Create and start custom App class
const app = new App(expressApp);
app.start();
