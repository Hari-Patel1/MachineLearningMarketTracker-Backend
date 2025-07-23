import express from "express";
import { addPortfolio } from "./add_portfolio"
import { removePortfolio } from "./remove_portfolio";
import { loadPortfolio } from "./load_portfolio";

const router = express.Router({ mergeParams: true });

router.post(
    "/load",
    loadPortfolio
)

router.post(
    "/add",
    addPortfolio
)

router.delete(
    "/remove",
    removePortfolio
)



export { router as portfolioEndpoints }