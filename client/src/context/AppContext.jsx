import ProductProvider from "./ProductContext";
import CartProvider from "./CartContext";
import FavProvider from "./FavContext";

export default function AppProvider({ children }) {
  return (
    <ProductProvider>
      <CartProvider>
        <FavProvider>{children}</FavProvider>
      </CartProvider>
    </ProductProvider>
  );
}
