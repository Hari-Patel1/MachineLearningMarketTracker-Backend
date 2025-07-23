import express from "express";
import { predictorEndpoints } from "./endpoints";

const router = express.Router({ mergeParams: true });

router.use(
    "/predictor",
    predictorEndpoints
    
)

export { router  as predictorApi }