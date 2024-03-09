import { Router } from "express";
import { baseUrl as healthCheckUrl, healthCheckRouter } from "./HealthCheck"; 
import { baseUrl as locationUrl, locationRouter } from "./Location";

const router = Router();

// Health Check for the server running the apis
router.use(healthCheckUrl, healthCheckRouter);
router.use(locationUrl, locationRouter);

export default router;