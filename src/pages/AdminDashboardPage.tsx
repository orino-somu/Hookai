// /src/pages/AdminDashboardPage.tsx
import DashboardLayout from '../components/layout/DashboardLayout';
import { Users, FileText, DollarSign, TrendingUp, ShieldCheck, Search } from 'lucide-react';
import { motion } from 'motion/react';

export default function AdminDashboardPage() {
  const stats = [
    { label: 'Total Users', value: '12,847', icon: Users, color: 'text-primary' },
    { label: 'Active Scripts', value: '142,092', icon: FileText, color: 'text-accent' },
    { label: 'Monthly Revenue', value: '$34,920', icon: DollarSign, color: 'text-success' },
    { label: 'Conversion Rate', value: '3.4%', icon: TrendingUp, color: 'text-warning' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center">
              <ShieldCheck className="w-8 h-8 mr-3 text-error" /> Admin Overview
            </h1>
            <p className="text-muted">Platform-wide statistics and system management.</p>
          </div>
          <div className="flex items-center space-x-3">
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input type="text" placeholder="Search users or scripts..." className="input-field pl-10 w-96" />
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           {stats.map((stat, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: i * 0.1 }}
               className="glass p-6 rounded-2xl"
             >
                <div className="flex items-center justify-between mb-4">
                   <div className={stat.color}><stat.icon className="w-8 h-8" /></div>
                </div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted">{stat.label}</p>
             </motion.div>
           ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <div className="glass rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-border bg-surface/50">
                <h3 className="font-bold">Recent Users</h3>
              </div>
              <div className="p-0">
                 {[1,2,3,4,5].map(i => (
                   <div key={i} className="flex items-center justify-between p-4 px-6 border-b border-border hover:bg-white/5 transition-all">
                      <div className="flex items-center space-x-3">
                         <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">U</div>
                         <div>
                            <p className="text-sm font-bold tracking-tight">User #{i * 42}</p>
                            <p className="text-xs text-muted leading-none">Joined 2 days ago</p>
                         </div>
                      </div>
                      <div className="text-right">
                         <span className="text-[10px] font-bold bg-success/10 text-success px-2 py-0.5 rounded border border-success/20 uppercase tracking-widest leading-none">Active</span>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="glass rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-border bg-surface/50">
                <h3 className="font-bold">System Health</h3>
              </div>
              <div className="p-8 space-y-8">
                 <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                       <span className="text-muted">Gemini API Load</span>
                       <span className="font-bold">24%</span>
                    </div>
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                       <div className="w-1/4 h-full bg-primary" />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                       <span className="text-muted">Database Storage (SQLite)</span>
                       <span className="font-bold">12.4 MB</span>
                    </div>
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                       <div className="w-[12%] h-full bg-accent" />
                    </div>
                 </div>
                 <div className="pt-4 grid grid-cols-2 gap-4">
                    <div className="p-4 bg-success/5 rounded-xl border border-success/20">
                       <p className="text-xs font-bold text-success uppercase tracking-widest mb-1">Status</p>
                       <p className="text-lg font-bold">Operational</p>
                    </div>
                    <div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
                       <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">Queue</p>
                       <p className="text-lg font-bold">0 Pending</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
