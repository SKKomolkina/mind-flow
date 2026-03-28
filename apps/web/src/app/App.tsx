import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage } from '@/pages/login/ui/LoginPage';
import { JournalPage } from '@/pages/journal/ui/JournalPage.tsx';
import { RegistrationPage } from '@/pages/registration/ui/RegistrationPage.tsx';
import { HomePage } from '@/pages/home/ui/HomePage.tsx';
import { ProtectedRoute } from './providers/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/*<Route path="/" element={<Navigate to="/login" replace />} />*/}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />

        <Route
          path="/journal"
          element={
            <ProtectedRoute>
              <JournalPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
