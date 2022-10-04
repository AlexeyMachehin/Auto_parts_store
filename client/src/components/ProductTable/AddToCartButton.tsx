import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  countSummInCart,
  setCountProductsInCart,
  manageProductInCart,
  manageProducts,
} from "../../redux/productsSlice";
import { localStorageUtil } from "../../utils/localStorageUtils";
import { Product } from "../../interfaces/product";
import { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { InputNumber, Tooltip } from "antd";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { selectorProductsInCart } from "../../redux/selectors";

export default function AddToCartButton(props: { product: Product }) {
  const dispatch = useAppDispatch();
  let productFromLocalStorage: Product | null = null;
  const [count, setCount] = useState<number>(0);
  const productsInCart = useAppSelector(selectorProductsInCart);

  useEffect(() => {
    productFromLocalStorage = localStorageUtil.getOneProduct(props.product.id);
    setCount(
      productFromLocalStorage ? productFromLocalStorage.quantityInCart : 0
    );
  }, []);

  useEffect(() => {
    productFromLocalStorage = localStorageUtil.getOneProduct(props.product.id);
    if (productFromLocalStorage != null) {
      console.log(1);
      dispatch(manageProducts(productFromLocalStorage));
    }
    if (
      productsInCart.find((element) => element.id === props.product.id) ===
      undefined
    ) {
      setCount(0);
    }
  });

  const manageProductsLocal = (value: number) => {
    setCount(value);
    dispatch(
      manageProductInCart({
        ...props.product,
        quantityInCart: value,
      })
    );
    localStorageUtil.manageProductsLocalStorage({
      ...props.product,
      quantityInCart: value,
    });
    dispatch(setCountProductsInCart());
    dispatch(countSummInCart());
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }} key={count}>
      <InputNumber
        min={0}
        max={props.product.quantity}
        defaultValue={count}
        onChange={manageProductsLocal}
      />
      {count !== 0 && (
        <Tooltip title="Delete">
          <IconButton
            onClick={() => {
              manageProductsLocal(0);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
    </div>
  );
}
