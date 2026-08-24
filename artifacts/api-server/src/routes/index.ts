import { Router, type IRouter } from "express";
import healthRouter from "./health";
import orthonovaRouter from "./orthonova";

const router: IRouter = Router();

router.use(healthRouter);
router.use(orthonovaRouter);

export default router;
