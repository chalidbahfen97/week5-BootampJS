import { Router } from "express";
import IndexController from "../controller/IndexController";
import upDowloadHelper from "../helpers/upDowloadHelper";

const router = Router();

router.get("/rawSQL",IndexController.productContoller.findProductsBySQL);
router.get("/",IndexController.productContoller.findAllRows);
router.get("/:id",IndexController.productContoller.findRowById);
router.get("/images/:fileName",upDowloadHelper.showProductImage);

router.post("/",IndexController.productContoller.createRow);
router.post("/multipart",IndexController.productContoller.createProductImage,
             IndexController.productImageController.createProductImage,
             IndexController.productImageController.findProdImagesById);

router.put("/:id",IndexController.productContoller.updateRow);

router.delete("/:id",IndexController.productContoller.deleteRow);

export default router;