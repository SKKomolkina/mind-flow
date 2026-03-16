import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage } from '@/pages/login/ui/LoginPage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
