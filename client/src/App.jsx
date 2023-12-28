import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

import "./App.css";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import LoggedInPage from "./pages/LoggedInPage";
import ManagerPage from "./pages/ManagerPage";

import Header from "./components/Header";

import PrivateRoute from "./utils/PrivateRoute";

import ProductList from "./components/ProductList";
import Navbar from "./components/Navbar";
import ProductPage from "./components/ProductPage";
import CartProvider from "./context/CartContext";

function App() {
  return (
    <div className="app">
      <Router>
        <AuthProvider>
          <CartProvider>
            <Header />
            <Navbar />
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <HomePage />
                    <ProductList />
                  </>
                }
              />

              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/product/:id"
                element={
                  <>
                    <HomePage />
                    <ProductPage />
                  </>
                }
              />

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
