import './App.css';
import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {fetchUserAction} from './features/authSlice';
import Header from "./components/Header";
import Footer from "./components/Footer";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";

const App = () => {
    const dispatch = useDispatch();
    const {isAuthenticated} = useSelector((state) => state.auth);
    useEffect(() => {
        dispatch(fetchUserAction());
    }, [dispatch]);
    return (
        <Router>
            <div className="App">
                <Header/>
                <main>
                    <Routes>
                        <Route path="/register"
                               element={isAuthenticated ? <Navigate to="/profile"/> : <RegisterPage/>}/>
                        <Route path="/login" element={isAuthenticated ? <Navigate to="/profile"/> : <LoginPage/>}/>
                        <Route path="/profile" element={isAuthenticated ? <Navigate to="/profile"/> : <ProfilePage/>}/>
                        <Route path="/" element={isAuthenticated ? <Navigate to="/profile"/> : <LoginPage/>}/>
                    </Routes>
                </main>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;
