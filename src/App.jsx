import { Routes, Route } from "react-router-dom";
import Product from "./pages/Product/Product";
import Cart from "./pages/Cart/Cart";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<Product />} />
      </Route>
    </Routes>
  );
}

export default App;