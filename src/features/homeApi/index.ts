import express from "express";
import { homeEndpoints } from "./endpoints";

const router = express.Router({ mergeParams: true });

router.use(
    "/home",
    homeEndpoints
)

export { router  as homeApi }