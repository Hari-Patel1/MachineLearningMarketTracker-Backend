import express from "express";
import { loadSettings } from "./load_settings";

const router = express.Router({ mergeParams: true });

router.post(
    "/load",
    loadSettings
)



export { router as settingsEndpoints }