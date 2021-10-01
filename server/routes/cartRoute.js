import { Router } from "express";
import IndexController from "../controller/IndexController";

const router = Router();

router.get("/rawSQL",IndexController.cartController.findcartsBySQL);
router.get("/",IndexController.cartController.findAllRows);
router.get("/:id",IndexController.cartController.findRowById);
router.get("/detail",IndexController.cartController.liteCarts);

router.post("/",IndexController.cartController.createRow);
router.post("/order",IndexController.cartController.createOrder);
router.post("/lite",IndexController.cartController.createLineItems);

router.put("/:id",IndexController.cartController.updateRow);

router.delete("/:id",IndexController.cartController.deleteRow);

export default router;