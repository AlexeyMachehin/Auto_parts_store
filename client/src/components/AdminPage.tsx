import ProductTable from "./ProductTable";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import DiscountDatePicker from "./DiscountDatePicker";
import Button from "@mui/material/Button";

export default function AdminPage() {
  return (
    <div>
      <form
        style={{
          display: "flex",
          justifyContent: "space-between",
          maxWidth: "850px",
        }}
        action=""
      >
        <TextField
          id="outlined-basic"
          label="Введите текст акции  "
          variant="outlined"
        />
        <DiscountDatePicker />
        <Button onClick={() => {}} variant="outlined">
          ОК
        </Button>
      </form>

      <ProductTable />
    </div>
  );
}
