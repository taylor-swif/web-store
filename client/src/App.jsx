import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

import "./App.css";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import LoggedInPage from "./pages/LoggedInPage";
import ManagerPage from "./pages/ManagerPage";

import PrivateRoute from "./utils/PrivateRoute";

import ProductList from "./components/ProductList";
import Navbar from "./components/Navbar";
import ProductPage from "./components/ProductPage";
import CartProvider from "./context/CartContext";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="app">
      <div className="content-wrap">
        <Router>
          <AuthProvider>
            <CartProvider>
              <Navbar />
              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      <HomePage />
                    </>
                  }
                />

                <Route
                  path="/store"
                  element={
                    <>
                      <ProductList />
                    </>
                  }
                />

                <Route
                  path="/user-profile"
                  element={
                    <>
                      <HomePage />
                    </>
                  }
                />

                <Route path="/login" element={<LoginPage />} />
                <Route
                  path="/product/:id"
                  element={
                    <>
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
      <Footer />
    </div>
  );
}

export default App;
