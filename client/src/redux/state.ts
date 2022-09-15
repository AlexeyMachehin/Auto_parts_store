import { ProductsState } from "../interfaces/product";

export const initialState: ProductsState = {
  products: null,
  isError: false,
  isLoading: false,
  message: "",
  productsInCart: [],
  discountDates: null,
  countProductsInCart: null,
};

// const productSchema = mongoose.Schema({
//     name: { type: String, required: true },
//     catalogueNumber: { type: String, required: true },
//     id: { type: Number, required: true },
//     manufacturer: { type: String, required: true },
//     quantity: { type: Number, required: true },
//     unitOfMeasurement: { type: String, required: true },
//     wholesalePrice: { type: Number, required: true },
//     retailPrice: { type: Number, required: true },
//   });
