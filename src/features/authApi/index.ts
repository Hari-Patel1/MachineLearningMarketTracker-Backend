import express from "express";
import { authEndpoints } from "./endpoints";

const router = express.Router({ mergeParams: true });

router.use(
    "/auth",
    authEndpoints
)

export { router  as authApi }