import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './components/Pages/Home/HomePage';
import LoginPage from './components/Pages/Login/LoginPage';
import RegisterPage from './components/Pages/Register/RegisterPage';
import ModelPage from './components/Pages/Model/ModelPage';
import UserPage from './components/Pages/Users/UserPage';
import NotFoundPage from './components/Pages/NotFoundPage'; // Create this file
import React from 'react'; // Add this line


const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/model" element={<ModelPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="*" element={<NotFoundPage />} /> {/* 404 Route */}
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;