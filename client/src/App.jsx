import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import LoggedInPage from "./pages/LoggedInPage";
import ManagerPage from "./pages/ManagerPage";
import UserPage from "./pages/UserPage";

import PrivateRoute from "./utils/PrivateRoute";

import ProductList from "./components/ProductList";
import Navbar from "./components/Navbar";
import ProductPage from "./components/ProductPage";
import Footer from "./components/Footer";
import { useContext } from "react";
import { ProductContext } from "./context/ProductContext";
import { FavContext } from "./context/FavContext";
import { AuthProvider } from "./context/AuthContext";
import AboutUsPage from "./pages/AboutUsPage";
import ScrollToTop from "./utils/ScrollToTop";
import PaymentPage from "./pages/PaymentPage";

function App() {
  const products = useContext(ProductContext);
  const id = useContext(FavContext);
  const favorites = products.filter((product) => id.includes(product.id));

  return (
    <div className="app">
      <div className="content-wrap">
        <Router>
          <ScrollToTop>
            <AuthProvider>
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
                  path="/payment"
                  element={
                    <>
                      <PaymentPage />
                    </>
                  }
                />

                <Route
                  path="/store"
                  element={
                    <>
                      <ProductList products={products} />
                    </>
                  }
                />

                <Route
                  path="/user-profile"
                  element={
                    <>
                      <UserPage />
                    </>
                  }
                />

                <Route
                  path="/about-us"
                  element={
                    <>
                      <AboutUsPage />
                    </>
                  }
                />

                <Route
                  path="/favorites"
                  element={
                    <>
                      <ProductList products={favorites} />
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
            </AuthProvider>
          </ScrollToTop>
        </Router>
      </div>
      <Footer />
    </div>
  );
}

export default App;
