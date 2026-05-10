// /src/pages/DashboardPage.tsx
import DashboardLayout from '../components/layout/DashboardLayout';
import { useAuthStore } from '../store/authStore';
import { PenTool, Hash, Star, Zap, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', scripts: 2, hooks: 5 },
  { name: 'Tue', scripts: 1, hooks: 8 },
  { name: 'Wed', scripts: 4, hooks: 12 },
  { name: 'Thu', scripts: 2, hooks: 7 },
  { name: 'Fri', scripts: 5, hooks: 15 },
  { name: 'Sat', scripts: 3, hooks: 10 },
  { name: 'Sun', scripts: 1, hooks: 4 },
];

export default function DashboardPage() {
  const { user } = useAuthStore();

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {user?.name}!</h1>
          <p className="text-muted">Here's what's happening with your content today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Total Scripts', value: '24', icon: PenTool, color: 'text-primary' },
            { label: 'Hooks Generated', value: '142', icon: Hash, color: 'text-accent' },
            { label: 'Avg Hook Score', value: '8.4', icon: Star, color: 'text-warning' },
            { label: 'Usage Streak', value: '7 days', icon: Zap, color: 'text-success' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="glass p-6 rounded-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={stat.color}>
                  <stat.icon className="w-8 h-8" />
                </div>
                <span className="flex items-center text-xs text-success bg-success/10 px-2 py-1 rounded-full">
                  +12% <ArrowUpRight className="w-3 h-3 ml-1" />
                </span>
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chart */}
          <div className="lg:col-span-2 glass p-8 rounded-2xl h-[400px]">
            <h3 className="text-xl font-bold mb-6">Generation Activity</h3>
            <ResponsiveContainer width="100%" height="80%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2A3A" />
                <XAxis dataKey="name" stroke="#8B8B9E" />
                <YAxis stroke="#8B8B9E" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1A1A24', border: '1px solid #2A2A3A' }}
                  itemStyle={{ color: '#F1F1F3' }}
                />
                <Line type="monotone" dataKey="scripts" stroke="#7C3AED" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="hooks" stroke="#3B82F6" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
             <div className="glass p-6 rounded-2xl">
               <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
               <div className="space-y-3">
                 <button className="btn-primary w-full flex items-center justify-center">
                   <PenTool className="w-5 h-5 mr-2" /> New Script
                 </button>
                 <button className="w-full py-2.5 rounded-lg border border-border hover:bg-white/5 transition-all flex items-center justify-center font-medium">
                   <Hash className="w-5 h-5 mr-2" /> Hook Generator
                 </button>
               </div>
             </div>

             <div className="glass p-6 rounded-2xl bg-linear-to-br from-primary/20 to-accent/20 border-primary/30">
               <h3 className="text-lg font-bold mb-2">Upgrade to Agency</h3>
               <p className="text-sm text-muted mb-4">Unlock team seats, multi-workspace support, and unlimited AI exports.</p>
               <button className="text-sm font-bold text-primary flex items-center hover:underline">
                 View Plans <ArrowUpRight className="w-4 h-4 ml-1" />
               </button>
             </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
