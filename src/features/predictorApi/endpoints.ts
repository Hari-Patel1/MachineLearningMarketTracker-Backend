import express from "express";
import { loadPredictor } from "./load_predictor";
import { removePredictor } from "./remove_predictor";
import { getPrediction } from "./get_predictions";


const router = express.Router({ mergeParams: true });

router.get(
    "/loadPredictor",
    loadPredictor
)

router.delete(
    "/removePredictor",
    removePredictor
)

router.get(
    "/getPrediction",
    getPrediction
)




export { router as predictorEndpoints }