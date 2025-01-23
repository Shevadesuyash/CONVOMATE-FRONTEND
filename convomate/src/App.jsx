import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/Pages/Home/HomePage';
import LoginPage from './components/Pages/Login/LoginPage';
import ModelPage from './components/Pages/Model/ModelPage'; // Ensure this file exists
import RegisterPage from './components/Pages/Register/RegisterPage'; // Ensure this file exists
import UserPage from './components/Pages/Users/UserPage'; // Ensure this file exists
import IntroSection from './components/Pages/Home/IntroSection'; // Corrected path
import RegistrationForm from './components/Pages/Register/RegistrationForm'; // Corrected path

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/model" element={<ModelPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/intro" element={<IntroSection />} />
        <Route path="/registration" element={<RegistrationForm />} />
      </Routes>
    </Router>
  );
};

export default App;
