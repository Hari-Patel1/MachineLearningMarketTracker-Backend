import express from "express";
import { loadStockData } from "./load_stock_data";
import { addStockPortfolio } from "./add_stock_portfolio";
import { loadstockportfolio } from "./load_stock_portfolio";
import { removeStockPortfolio } from "./remove_stock_portfolio";
import { addStockPredictor } from "./add_stock_predictor";

const router = express.Router({ mergeParams: true });

router.get(
    "/loadStockData",
    loadStockData
)

router.post(
    "/addStockPortfolio",
    addStockPortfolio
)

router.get(
    "/loadStockPortfolio",
    loadstockportfolio
)

router.delete(
    "/removeStockPortfolio",
    removeStockPortfolio
)

router.post(
    "/addStockPredictor",
    addStockPredictor
)


export { router as stockEndpoints }