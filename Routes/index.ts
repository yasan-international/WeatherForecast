import { Router } from "express";
import { baseUrl as healthCheckUrl, healthCheckRouter } from "./healthCheck"; 

const router = Router();

// Health Check for the server running the apis
router.use(healthCheckUrl, healthCheckRouter);

export default router;