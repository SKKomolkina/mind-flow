import { Link, useLocation, useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-slate-100 py-5 sticky top-0 z-50">
      <div className="container mx-auto px-6 flex justify-between items-center">

        {/* Логотип */}
        <div className="flex items-center gap-8">
          <Link to="/" className="text-xl font-black tracking-tighter text-blue-600 uppercase">
            Mind.Journal
          </Link>

          {/* Ссылки навигации */}
          <div className="flex gap-6">
            <Link
              to="/"
              className={`text-[10px] font-black uppercase tracking-widest transition-colors ${
                isActive('/') ? 'text-blue-600' : 'text-slate-400 hover:text-slate-900'
              }`}
            >
              Дашборд
            </Link>
            <Link
              to="/journal"
              className={`text-[10px] font-black uppercase tracking-widest transition-colors ${
                isActive('/journal') ? 'text-blue-600' : 'text-slate-400 hover:text-slate-900'
              }`}
            >
              Журнал
            </Link>
          </div>
        </div>

        {/* Профиль / Выход */}
        <div className="flex items-center gap-6">
          <button
            onClick={handleLogout}
            className="text-[10px] font-black uppercase tracking-widest text-red-400 hover:text-red-600 transition-colors"
          >
            Выйти
          </button>
        </div>
      </div>
    </nav>
  );
};
