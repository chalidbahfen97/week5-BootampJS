import { Router } from "express";
import IndexController from "../controller/IndexController";

const router = Router();

router.get("/rawSQL",IndexController.productContoller.findProductsBySQL);
router.get("/",IndexController.productContoller.findAllRows);
router.get("/:id",IndexController.productContoller.findRowById);
router.get("/images/:fileName",IndexController.productContoller.showProductImage);

router.post("/",IndexController.productContoller.createRow);

router.put("/:id",IndexController.productContoller.updateRow);

router.delete("/:id",IndexController.productContoller.deleteRow);

export default router;