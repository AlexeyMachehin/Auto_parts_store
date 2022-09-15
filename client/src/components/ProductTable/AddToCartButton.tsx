import { Button, ButtonGroup, InputLabel, TextField } from "@mui/material";
import { useAppDispatch } from "../../app/hooks";
import {
  deleteProductFromCart,
  setCountProductsInCart,
  setProductInCart,
} from "../../redux/productsSlice";
import { localStorageUtil } from "../../utils/localStorageUtil";
import { Product } from "../../interfaces/product";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function valuetext(value: number) {
  return `${value}°C`;
}

export default function AddToCartButton(props: { product: Product }) {
  const dispatch = useAppDispatch();
  let productFromLocalStorage: Product | null = null;
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    productFromLocalStorage = localStorageUtil.getOneProduct(props.product.id);
    setCount(
      productFromLocalStorage ? productFromLocalStorage.quantityInCart : 0
    );
  });

  return (
    <div>
      {" "}
      <ButtonGroup variant="outlined" aria-label="outlined button group">
        <Button
          onClick={() => {
            setCount(count + 1);
            dispatch(setProductInCart(props.product));
            localStorageUtil.putProducts({
              ...props.product,
              quantityInCart: count,
            });
            dispatch(setCountProductsInCart());
          }}
        >
          +
        </Button>
        <Button>{count}</Button>

        {/* <TextField onChange={(i)=>{ setCount(Number(i.target.value))}} style={{
    border:"none",
    backgroundImage:'none',
    backgroundColor:'transparent',
   
    boxShadow: 'none',
}} type="text" defaultValue={count}  value={null} /> */}

        <Button
          onClick={() => {
            {
              count > 0 && setCount(count - 1);
            }
            dispatch(deleteProductFromCart(props.product.id));
            localStorageUtil.deleteProduct(props.product.id);
            dispatch(setCountProductsInCart());
          }}
        >
          -
        </Button>
      </ButtonGroup>{" "}



    

    </div>
  );
}
