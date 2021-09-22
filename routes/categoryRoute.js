import { Router } from "express";
import IndexController from "../controller/IndexController";

const router = Router();

router.get("/",IndexController.categoryController.findCategoryBySQL);

export default router;