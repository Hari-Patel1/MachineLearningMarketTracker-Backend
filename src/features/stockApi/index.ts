import express from "express";
import { stockEndpoints } from "./endpoints";
const router = express.Router({ mergeParams: true });

router.use(
    "/stock",
    stockEndpoints
)

export { router  as stockApi }