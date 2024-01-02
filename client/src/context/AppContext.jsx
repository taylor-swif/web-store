import { AuthProvider } from "./context/AuthContext";
import ProductProvider from "./context/ProductContext";
import CartProvider from "./context/CartContext";

export default function AppProvider({ children }) {
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>{children}</CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
}
