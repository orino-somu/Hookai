// /src/components/layout/DashboardLayout.tsx
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { LayoutDashboard, PenTool, Hash, Library, Settings, LogOut, ShieldAlert, Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';

const studioItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: PenTool, label: 'Script Studio', path: '/script-studio' },
  { icon: Hash, label: 'Hook Lab', path: '/hook-generator' },
];

const personalItems = [
  { icon: Library, label: 'Library', path: '/library' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getPageTitle = () => {
    const allItems = [...studioItems, ...personalItems];
    const item = allItems.find(i => i.path === location.pathname);
    return item?.label || 'Studio';
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-surface flex flex-col">
        <div className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <Sparkles className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              HookMind
            </span>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-6 py-4 overflow-y-auto">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-muted font-bold px-3 mb-3">Studio</div>
            <div className="space-y-1">
              {studioItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all",
                    location.pathname === item.path 
                      ? "bg-gradient-to-r from-primary/20 to-transparent text-primary border-l-2 border-primary" 
                      : "text-muted hover:text-text hover:bg-card"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[10px] uppercase tracking-widest text-muted font-bold px-3 mb-3">Personal</div>
            <div className="space-y-1">
              {personalItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all",
                    location.pathname === item.path 
                      ? "bg-gradient-to-r from-primary/20 to-transparent text-primary border-l-2 border-primary" 
                      : "text-muted hover:text-text hover:bg-card"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
          
          {user?.role === 'ADMIN' && (
            <div>
              <div className="text-[10px] uppercase tracking-widest text-error font-bold px-3 mb-3">System</div>
              <Link
                to="/admin"
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all",
                  location.pathname === '/admin' ? "bg-error/20 text-error border-l-2 border-error" : "text-error/70 hover:bg-error/10"
                )}
              >
                <ShieldAlert className="w-5 h-5" />
                <span className="font-medium">Admin Panel</span>
              </Link>
            </div>
          )}
        </nav>

        <div className="p-4 mt-auto border-t border-border">
          <div className="bg-card border border-border rounded-xl p-4 mb-4">
            <div className="flex justify-between text-xs mb-2">
              <span className="text-muted">Credits</span>
              <span className="font-bold">12/20</span>
            </div>
            <div className="h-1.5 w-full bg-background rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary to-accent w-[60%]"></div>
            </div>
            <button className="w-full mt-3 py-2 text-[11px] font-bold uppercase tracking-widest bg-primary/10 text-primary border border-primary/20 rounded-lg hover:bg-primary hover:text-white transition-all">
              Upgrade Plan
            </button>
          </div>

          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white text-xs font-bold shadow-glow">
                {user?.name?.[0]}
              </div>
              <div className="hidden lg:block overflow-hidden">
                <p className="text-xs font-bold truncate w-24">{user?.name}</p>
                <p className="text-[10px] text-muted">Pro Plan</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-muted hover:text-error hover:bg-error/10 rounded-lg transition-all"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full bg-background relative overflow-hidden">
        {/* Top Header */}
        <header className="h-16 border-b border-border px-8 flex items-center justify-between bg-background/50 backdrop-blur-sm sticky top-0 z-10">
          <h1 className="text-lg font-bold tracking-tight uppercase text-muted/50">{getPageTitle()}</h1>
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-card/50 rounded-full border border-border">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
              <span className="text-[10px] font-bold text-muted uppercase tracking-wider">Gemini 2.0 Flash Active</span>
            </div>
            <div className="text-xs text-muted font-medium bg-white/5 px-2 py-1 rounded">v1.2.0-beta</div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <motion.div
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
