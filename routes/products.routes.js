import { Router } from "express";
import {
  getProducts,
  createProduct,
  updateProduct,
  getProduct,
  deleteProduct,
} from "../controllers/product.controller.js";
import fileUpload from "express-fileupload";

const router = Router();

router.get("/", getProducts);
router.post("/",fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
}), createProduct);

router.post("/:id", fileUpload({
  useTempFiles: true,
  tempFileDir: "./uploads",
}),updateProduct);
router.get("/:id", getProduct);
router.delete("/:id", deleteProduct);

export default router;
