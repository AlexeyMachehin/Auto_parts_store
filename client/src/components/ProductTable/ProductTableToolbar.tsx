import { alpha } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import {
  countSummInCart,
  deleteAllProductsFromCart,
  setCountProductsInCart,
} from "../../redux/productsSlice";
import { localStorageUtil } from "../../utils/localStorageUtils";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectorProductsInCart } from "../../redux/selectors";

export const ProductTableToolbar = (props: {
  page: string;
  numSelected: number;
  selectedId: readonly string[];
}) => {
  const productsInCart = useAppSelector(selectorProductsInCart);
  const dispatch = useAppDispatch();
  const { numSelected } = props;
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ marginRight: "50px" }}>
              {props.page === "/AdminPage" && (
                <div>
                  Товары на складе{" "}
                  <Tooltip title="add">
                    <IconButton>
                      <AddIcon />
                    </IconButton>
                  </Tooltip>
                </div>
              )}
              {props.page === "/Cart" && "Корзина"}
            </div>
            <div>
              {props.page === "/AdminPage" && (
                <div>
                  Изменить наценку на весь товар{" "}
                  <Tooltip title="Edit">
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                </div>
              )}
              {props.page === "/Cart" && (
                <div>
                  применить скидку{" "}
                  <Tooltip title="add">
                    <IconButton>
                      <AddIcon />
                    </IconButton>
                  </Tooltip>
                </div>
              )}
            </div>
            {productsInCart.length > 0 && props.page !== "/AdminPage" && (
              <div>
                Очистить корзину
                <Tooltip title="Delete">
                  <IconButton
                    onClick={() => {
                      dispatch(deleteAllProductsFromCart());
                      localStorageUtil.deleteAllProductsFromLocalStorage();
                      dispatch(setCountProductsInCart());
                      dispatch(countSummInCart());
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </div>
            )}
          </div>
        </Typography>
      )}
      {numSelected > 0 ? (
        <div style={{ display: "flex" }}>
          {props.page === "/AdminPage" && (
            <Tooltip title="Edit">
              <IconButton>
                <EditIcon />
              </IconButton>
            </Tooltip>
          )}
        </div>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};
