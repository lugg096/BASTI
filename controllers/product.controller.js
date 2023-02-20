import Product from "../models/product.model.js";
import { uploadImage, deleteImage } from '../utils/cloudinary.js'
import fs from 'fs-extra'

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {


  try {
    const newProduct = new Product({
      tienda: req.body.tienda,
      nombre: req.body.nombre,
      desc: req.body.desc,
      pen: req.body.pen,
      tmp_reserva: req.body.tmp_reserva,
      usuario: req.body.usuario,
      status: req.body.status
    });

    if (req.files?.image) {
      const result = await uploadImage(req.files.image.tempFilePath)
      newProduct.image = {
        public_id: result.public_id,
        secure_url: result.secure_url
      }
      await fs.unlink(req.files.image.tempFilePath)
    }

    const savedProduct = await newProduct.save();
    return res.json(savedProduct);
  } catch (error) {
    if (req.files?.image) {
      await fs.unlink(req.files.image.tempFilePath)
    }
    return res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  console.log('BODY',req.body )
  const { id } = req.params;
  const { body } = req;
  try {
    console.log('id',id );
   ;
    const updatedProduct = await Product.findByIdAndUpdate(id, { $set: req.body }, { new: true });
    if (!updatedProduct)
      return res.status(404).json({ message: "Product Not Found" });
    return res.json(updatedProduct);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) return res.status(404).json({ message: 'Product does not exists' })

    await deleteImage(deletedProduct.image.public_id)

    return res.json(deletedProduct);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const productFound = await Product.findById(id);
    if (!productFound)
      return res.status(404).json({ message: "Product not found" });
    return res.json(productFound);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
