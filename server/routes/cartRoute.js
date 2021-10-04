import { Router } from "express";
import IndexController from "../controller/IndexController";

const router = Router();

router.get("/rawSQL",IndexController.cartController.findCartsBySQL);
router.get("/",IndexController.cartController.findCartRows);
router.get("/detail",IndexController.cartController.liteCarts);
router.get("/:id",IndexController.cartController.findCartRowsById);

router.post("/",IndexController.cartController.createCarts);
router.post("/order",IndexController.cartController.createOrder);
router.post("/lite",IndexController.cartController.createLineItems);

router.put("/:id",IndexController.cartController.updateCarts);

router.delete("/:id",IndexController.cartController.deleteCarts);

export default router;