import { Router } from "express";
import { baseUrl as healthCheckUrl, healthCheckRouter } from "./HealthCheck"; 
import { baseUrl as locationUrl, locationRouter } from "./Location";
import { baseUrl as weatherUrl, weatherRouter } from "./Weather";

const router = Router();

// Health Check for the server running the apis
router.use(healthCheckUrl, healthCheckRouter);
router.use(locationUrl, locationRouter);
router.use(weatherUrl, weatherRouter);

export default router;