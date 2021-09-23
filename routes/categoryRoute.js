import { Router } from "express";
import IndexController from "../controller/IndexController";

const router = Router();

router.get("/rawSQL",IndexController.categoryController.findCategoryBySQL);
router.get("/",IndexController.categoryController.findAllRows);
router.get("/:id",IndexController.categoryController.findRowById);

router.post("/",IndexController.categoryController.createRow);

router.put("/:id",IndexController.categoryController.updateRow);

router.delete("/:id",IndexController.categoryController.deleteRow);

export default router;