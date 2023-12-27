import React, {useState} from 'react'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { AuthProvider } from './context/AuthContext'

import './App.css'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import LoggedInPage from './pages/LoggedInPage'
import ManagerPage from './pages/ManagerPage'

import Header from './components/Header'

import PrivateRoute from './utils/PrivateRoute'

import ProductList from './components/ProductList'
import Navbar from './components/Navbar'
import CartModal from './components/modals/CartModal'
import ProductPage from './components/ProductPage'
import CartProvider from './components/modals/CartContext'

function App() {
    const [cartItems, setCartItems] = useState([]);
    const [isCartModalOpen, setIsCartModalOpen] = useState(false);

    const handleAddToCart = (cartItem) => {
        const existingItemIndex = cartItems.findIndex(item => item.id === cartItem.id);
    
        if (existingItemIndex !== -1) {
          // Produkt już istnieje w koszyku, zaktualizuj ilość
          const updatedCartItems = [...cartItems];
          updatedCartItems[existingItemIndex].quantity += cartItem.quantity;
          setCartItems(updatedCartItems);
        } else {
          // Produkt nie istnieje w koszyku, dodaj nowy produkt
          setCartItems(prevItems => [...prevItems, cartItem]);
        }
      };

    const handleOpenCartModal = () => {
        setIsCartModalOpen(true);
      };
    
    const handleCloseCartModal = () => {
      setIsCartModalOpen(false);
    };

    const handleUpdateQuantity = (productId, newQuantity) => {
        const updatedCartItems = cartItems.map(item =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        );
        setCartItems(updatedCartItems);
    };

    const handleRemoveItem = (productId) => {
      const updatedCartItems = cartItems.filter((item) => item.id !== productId);
      setCartItems(updatedCartItems);
    };

    return (
    <div className="app">
      <Router>
        <AuthProvider>
          <CartProvider>
          <Header />
          <Routes>
            <Route path="/" element={
              <>
                <HomePage />
                <Navbar cartItems={cartItems} onOpenCartModal={handleOpenCartModal} />
                <ProductList onAddToCart={handleAddToCart} />
              </>
            } />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/product/:id" element={
            <>
              <HomePage />
              <Navbar cartItems={cartItems} onOpenCartModal={handleOpenCartModal} />
              <ProductPage />
              <CartModal
                cartItems={cartItems}
                isOpen={isCartModalOpen}
                onClose={handleCloseCartModal}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
              />
            </>
            } />

            <Route
              path="/mustbeloggedin"
              element={
                <PrivateRoute roleNeeded={2}>
                  <LoggedInPage />
                </PrivateRoute>
              }
            />

            <Route
              path="/mustbemanager"
              element={
                <PrivateRoute roleNeeded={1}>
                  <ManagerPage />
                </PrivateRoute>
              }
            />
          </Routes>
          </CartProvider>
        </AuthProvider>
      </Router>
      
    </div>
  );
}

export default App;