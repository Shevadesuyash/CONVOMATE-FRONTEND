import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import ModelPage from './pages/ModelPage'; // Import the new ModelPage
import LoginPage from './pages/LoginPage'; // Adjust the path as necessary
import RegisterPage from './pages/RegisterPage'; // Import the new RegisterPage
import NotFoundPage from './pages/NotFoundPage'; // Create this file
import TranslationModulePage from './pages/TranslationModulePage'; // Import the new TranslationModulePage

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/models" element={<ModelPage />} /> {/* Add route for Model Page */}
           <Route path="/login" element={<LoginPage />} />
           <Route path="/register" element={<RegisterPage />} />
           <Route path="/model/translator" element={<TranslationModulePage />} />
           <Route path="*" element={<NotFoundPage />} /> {/* 404 Route */}
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;