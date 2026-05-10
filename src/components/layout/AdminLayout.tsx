// /src/components/layout/AdminLayout.tsx
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { 
  BarChart3, 
  Users, 
  FileText, 
  CreditCard, 
  Zap, 
  Bell, 
  Settings, 
  LogOut, 
  LayoutDashboard,
  ShieldCheck,
  ChevronRight,
  Activity
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';

const adminMenuItems = [
  { icon: LayoutDashboard, label: 'Overview', path: '/admin-panel' },
  { icon: Users, label: 'User Hub', path: '/admin-panel/users' },
  { icon: FileText, label: 'Script Archive', path: '/admin-panel/scripts' },
  { icon: CreditCard, label: 'Subscribers', path: '/admin-panel/billing' },
  { icon: BarChart3, label: 'Revenue', path: '/admin-panel/revenue' },
  { icon: Zap, label: 'Engine Stats', path: '/admin-panel/ai-stats' },
  { icon: Bell, label: 'Broadcasts', path: '/admin-panel/notifications' },
  { icon: Activity, label: 'Audit Log', path: '/admin-panel/audit' },
  { icon: Settings, label: 'Platform', path: '/admin-panel/settings' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getActiveLabel = () => {
    return adminMenuItems.find(i => i.path === location.pathname)?.label || 'Intelligence';
  };

  return (
    <div className="flex h-screen bg-[#050505] overflow-hidden font-sans text-white">
      {/* Admin Sidebar */}
      <aside className="w-72 border-r border-white/5 bg-[#09090b] flex flex-col z-50">
        <div className="p-8">
           <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-error rounded-xl flex items-center justify-center shadow-lg shadow-error/20">
               <ShieldCheck className="text-white w-6 h-6" />
             </div>
             <div>
               <span className="text-xl font-bold tracking-tight block">HookMind</span>
               <span className="text-[10px] font-black uppercase tracking-widest text-error">Control Center</span>
             </div>
           </div>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto pt-4">
           {adminMenuItems.map((item) => {
             const isActive = location.pathname === item.path;
             return (
               <Link
                 key={item.path}
                 to={item.path}
                 className={cn(
                   "flex items-center justify-between group px-4 py-3 rounded-xl transition-all duration-300",
                   isActive 
                     ? "bg-error/10 text-error border border-error/20 shadow-lg shadow-error/5" 
                     : "text-muted hover:text-white hover:bg-white/5"
                 )}
               >
                 <div className="flex items-center gap-3">
                   <item.icon className={cn("w-5 h-5", isActive ? "text-error" : "text-muted-foreground")} />
                   <span className="text-sm font-bold tracking-tight uppercase">{item.label}</span>
                 </div>
                 {isActive && <ChevronRight className="w-4 h-4" />}
               </Link>
             );
           })}
        </nav>

        <div className="p-6 mt-auto border-t border-white/5 bg-black/20">
           <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-error/20 border border-error/30 flex items-center justify-center font-bold text-error">
                {user?.name?.[0]}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-bold truncate">{user?.name}</p>
                <p className="text-[10px] text-muted uppercase tracking-wider">Root Administrator</p>
              </div>
           </div>
           
           <button
             onClick={handleLogout}
             className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-muted hover:text-error hover:bg-error/10 transition-all border border-transparent hover:border-error/20 font-bold uppercase tracking-widest text-[10px]"
           >
             <LogOut className="w-4 h-4" />
             Terminate Session
           </button>
        </div>
      </aside>

      {/* Admin Content Area */}
      <main className="flex-1 flex flex-col h-full bg-[#050505] relative overflow-hidden">
         {/* Top System Bar */}
         <header className="h-20 border-b border-white/5 px-10 flex items-center justify-between bg-[#050505]/80 backdrop-blur-xl sticky top-0 z-10">
            <div className="flex items-center gap-4">
               <h1 className="text-sm font-black uppercase tracking-widest text-muted">{getActiveLabel()}</h1>
               <div className="h-4 w-px bg-white/10" />
               <div className="flex items-center gap-2 text-[10px] font-bold text-success bg-success/10 px-3 py-1 rounded-full border border-success/20">
                  <Activity className="w-3 h-3 animate-pulse" />
                  SYSTEM ONLINE
               </div>
            </div>

            <div className="flex items-center gap-8">
               <div className="hidden lg:flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-muted/50">
                  <span>Server: asia-east1</span>
                  <span>CPU: 12%</span>
                  <span>DB: Cluster-0</span>
               </div>
               <div className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center hover:bg-white/5 cursor-pointer transition-all">
                  <Bell className="w-4 h-4 text-muted" />
               </div>
            </div>
         </header>

         {/* Content Scroll */}
         <div className="flex-1 overflow-y-auto p-10">
            <motion.div
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.4 }}
            >
               {children}
            </motion.div>
         </div>
      </main>
    </div>
  );
}
