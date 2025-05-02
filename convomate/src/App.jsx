import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/Shared/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import PublicRoute from './components/Shared/PublicRoute';
import ErrorBoundary from './components/Shared/ErrorBoundary';

const ModelPage = lazy(() => import('./pages/ModelPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const TranslationModulePage = lazy(() => import('./pages/TranslationModulePage'));
const ParagraphCheckerPage = lazy(() => import('./pages/ParagraphCheckerPage'));
const ChatbotPage = lazy(() => import('./pages/ChatbotPage'));
const SummariserPage= lazy(() => import('./pages/SummariserPage'));

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <ErrorBoundary>
          <Layout>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/model" element={<ModelPage />} />
                <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
                <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
                <Route path="/model/translator" element={<ProtectedRoute><TranslationModulePage /></ProtectedRoute>} />
                <Route path="/model/grammar-check" element={<ProtectedRoute><ParagraphCheckerPage /></ProtectedRoute>} />
                <Route path="/model/Chat-bot" element={<ProtectedRoute><ChatbotPage /></ProtectedRoute>} />
                <Route path="/model/Summariser" element={<ProtectedRoute><SummariserPage/></ProtectedRoute>} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </Layout>
        </ErrorBoundary>
      </Router>
    </AuthProvider>
  );
};

export default App;