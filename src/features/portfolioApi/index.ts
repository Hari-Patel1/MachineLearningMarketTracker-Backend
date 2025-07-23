import express from "express";
import { portfolioEndpoints } from "./endpoints"

const router = express.Router({ mergeParams: true });

router.use(
    "/portfolio",
    portfolioEndpoints
)


export { router  as portfolioApi }