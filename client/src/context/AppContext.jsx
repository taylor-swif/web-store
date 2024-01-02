import { AuthProvider } from "./AuthContext";
import ProductProvider from "./ProductContext";
import CartProvider from "./CartContext";

export default function AppProvider({ children }) {
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>{children}</CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
}
