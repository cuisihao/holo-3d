import React, { useState, createContext, useContext, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import SetView from './pages/SetView';
import CardDetail from './pages/CardDetail';
import { AuthState, User } from './types';
import { LogOut } from 'lucide-react';

// Auth Context
interface AuthContextType extends AuthState {
  login: (username: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState>(() => {
    const saved = localStorage.getItem('pokeholo_auth');
    return saved ? JSON.parse(saved) : { user: null, isAuthenticated: false };
  });

  useEffect(() => {
    localStorage.setItem('pokeholo_auth', JSON.stringify(auth));
  }, [auth]);

  const login = (username: string) => {
    const user: User = { username, role: 'admin' };
    setAuth({ user, isAuthenticated: true });
  };

  const logout = () => {
    setAuth({ user: null, isAuthenticated: false });
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-black/50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
                 <div className="w-8 h-8 rounded bg-gradient-to-br from-yellow-400 to-red-500 flex items-center justify-center font-bold text-black italic">P</div>
                 <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-500 tracking-tighter">
                    POKEHOLO
                 </h1>
            </div>
            
            <div className="flex items-center gap-4">
                <span className="text-sm text-neutral-400 hidden sm:block">Welcome, <span className="text-white">{user?.username}</span></span>
                <button 
                    onClick={logout}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors text-neutral-400 hover:text-white"
                    title="Logout"
                >
                    <LogOut size={20} />
                </button>
            </div>
        </div>
      </header>
      <main className="flex-grow relative">
        {children}
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout>
                  <Home />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/set/:setId"
            element={
              <ProtectedRoute>
                <Layout>
                  <SetView />
                </Layout>
              </ProtectedRoute>
            }
          />
           <Route
            path="/card/:cardId"
            element={
              <ProtectedRoute>
                <Layout>
                  <CardDetail />
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;