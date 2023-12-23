import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { AuthProvider } from './context/AuthContext'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import LoggedInPage from './pages/LoggedInPage'
import ManagerPage from './pages/ManagerPage'

import Header from './components/Header'

import PrivateRoute from './utils/PrivateRoute'

import ProductList from './components/ProductList'
import Navbar from './components/Navbar'

function App() {
    return (
        <div className="app">
            <Router>
                <AuthProvider>
                <Header/>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    
                    <Route path="/login" element={<LoginPage/>}/>
                    
                    <Route path="/mustbeloggedin" element={
                        <PrivateRoute roleNeeded={2}>
                            <LoggedInPage />
                        </PrivateRoute>}/>
                    
                    <Route path="/mustbemanager" element={
                        <PrivateRoute roleNeeded={1}>
                            <ManagerPage />
                        </PrivateRoute>}/>
                </Routes>
                </AuthProvider>
            </Router>
            <Navbar/>
            <ProductList/>
        </div>
    );
}

export default App;