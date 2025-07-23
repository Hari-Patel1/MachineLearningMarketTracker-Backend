import express from "express";
import { settingsEndpoints } from "./endpoints";

const router = express.Router({ mergeParams: true });

router.use(
    "/settings",
    settingsEndpoints
)

export { router  as settingsApi }