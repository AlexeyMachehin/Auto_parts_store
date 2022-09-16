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
import { InputNumber } from "antd";
import "antd/dist/antd.css";
import { Input } from "@mui/material";

export default function AddToCartButton(props: { product: Product }) {
  const onChange = (value: number) => {
    console.log("changed", value);
  };

  const dispatch = useAppDispatch();
  let productFromLocalStorage: Product | null = null;
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    productFromLocalStorage = localStorageUtil.getOneProduct(props.product.id);
    setCount(
      productFromLocalStorage ? productFromLocalStorage.quantityInCart : 0
    );
  }, []);

  return (
    <div key={count}>
      {" "}
      <ButtonGroup
        style={{ maxWidth: "200px" }}
        variant="outlined"
        aria-label="outlined button group"
      >
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
        {/* <Button>{count}</Button> */}

        {/* <TextField
          onChange={(i) => {
            setCount(Number(i.target.value));
          }}
          style={{
            border: "none",
            backgroundImage: "none",
            backgroundColor: "transparent",
            boxShadow: "none",
          }}
          type="text"
          defaultValue={count}
          
        /> */}
        <Button>
          {" "}
          <Input
          
            // type="number"
            style={{
              width: "100px",
              height: "100%",
            }}
            defaultValue={count}
            // variant="standard"
            onBlur={(i) => {
              console.log(i.target.value);
              setCount(Number(i.target.value));
            }}
          />
        </Button>

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
      {/* <InputNumber  onStep={(value, info)=>console.log(value, info)} min={0} max={props.product.quantity} defaultValue={count} onChange={onChange} /> */}
    </div>
  );
}
