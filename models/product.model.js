import mongoose from "mongoose";

const productSchema = new mongoose.Schema(

  {
    image: {
      secure_url: String,
      public_id: String
    },
    tienda: { type: String, required: false },
    nombre: { type: String, required: false },
    desc: { type: String, required: false },
    pen: { type: Number, required: false },
   /*  link: { type: String, required: false }, */
    status: { type: Number, required: false },
    tmp_reserva: { type: Number, required: false },
    usuario: { type: String, required: false },
    status: { type: Number, required: false }
  },
  {
    versionKey: false,
    timestamps: true,
  }

);

export default mongoose.model("Product", productSchema);
