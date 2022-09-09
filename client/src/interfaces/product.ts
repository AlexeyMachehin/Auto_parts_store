export interface Product {
  name: string;
  catalogueNumber: string;
  _id: number;
  manufacturer: string;
  quantity: number;
  unitOfMeasurement: string;
  wholesalePrice: number;
  retailPrice?: number;
}

export interface ProductsState {
  products: Product[] | null;
  isError: boolean;
  isLoading: boolean;
  message?: string;
}
