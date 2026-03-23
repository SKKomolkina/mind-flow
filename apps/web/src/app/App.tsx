import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '@/pages/login/ui/LoginPage';
import { JournalPage } from '@/pages/journal/ui/JournalPage.tsx';
import { RegistrationPage } from '@/pages/registration/ui/RegistrationPage.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/journal" element={<JournalPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
