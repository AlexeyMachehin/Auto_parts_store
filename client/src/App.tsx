import { Routes, Route } from "react-router-dom";
import "./App.css";
import AdminPage from "./components/AdminPage";
import Cart from "./components/Cart";
import Discount from "./components/Discount";
import Footer from "./components/HomePage/Footer";
import Header from "./components/HomePage/Header";
import LoginModal from "./components/LoginModal";
import ProductTable from "./components/ProductTable";

function App() {
  return (
    <div className="App">
      {/* <LoginModal /> */}
      <Header />
      <Discount />
      <div className="wrapper">
        <Routes>
          <Route path="/" element={<ProductTable />}></Route>
          <Route path="/AdminPage" element={<AdminPage />}></Route>
          <Route path="/Cart" element={<Cart />}></Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
