import { Router } from "express";
import IndexController from "../controller/IndexController";

const router = Router();

router.get("/rawSQL",IndexController.userController.findUsersBySQL);
router.get("/",IndexController.userController.findAllRows);
router.get("/:id",IndexController.userController.findRowById);

router.post("/",IndexController.userController.createRow);

router.put("/:id",IndexController.userController.updateRow);

router.delete("/:id",IndexController.userController.deleteRow);

export default router;