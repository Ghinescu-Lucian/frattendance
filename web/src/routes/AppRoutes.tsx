// src/routes/AppRoutes.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from '../Pages/Login';
import UploadPage from '../Pages/Upload';
import TrainingPage from '../Pages/Training';
export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/training" element={<TrainingPage />} />
      </Routes>
    </Router>
  );
}
