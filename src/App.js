import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Provider, useSelector, useDispatch,  } from 'react-redux';
import { fetchUserAction } from './features/authSlice';
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Registration from "./Pages/Registration/Registration";
import PrivateRoute from './Components/PrivateRoute';
import Login from "./Pages/Login/Login";
import Profile from "./Pages/Profile/Profile";
import ErrorBoundary from "./Components/ErrorBoundary";
import Template from './Pages/Template';
import store from './store/store';

const App = () => {
    const dispatch = useDispatch();
    const { loading, authUser } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(fetchUserAction());
    }, [dispatch]);

    if (loading) return;

    return (
            <Router>
                <ErrorBoundary>
                    <Template>
                        <div className="App">
                            <main>
                                <Routes>
                                    <Route path="/" element={authUser ? <Navigate to="/profile" /> : <Login />} />
                                    <Route path="/register" element={authUser ? <Navigate to="/profile" /> : <Registration />} />
                                    <Route path="/login" element={authUser ? <Navigate to="/profile" /> : <Login />} />
                                    <Route
                                        path="/profile"
                                        element={
                                            <PrivateRoute>
                                                <Profile />
                                            </PrivateRoute>
                                        } />
                                </Routes>
                            </main>
                            <Footer />
                        </div>
                    </Template>
                </ErrorBoundary>
            </Router>
    );
}

export default App;
