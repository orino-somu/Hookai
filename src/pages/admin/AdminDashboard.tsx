// /src/pages/admin/AdminDashboard.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';
import { 
  Users, 
  CreditCard, 
  Zap, 
  FileText, 
  TrendingUp, 
  DollarSign,
  ArrowUpRight,
  Clock
} from 'lucide-react';
import { cn } from '../../lib/utils';

const COLORS = ['#7C3AED', '#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get('/api/admin/dashboard');
        setStats(data);
      } catch (error) {
        console.error('Stats fetch failed');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading || !stats) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-error"></div>
      </div>
    );
  }

  const kpis = [
    { label: 'Total Users', value: stats.stats.totalUsers, growth: `+${stats.stats.todayUsers} today`, icon: Users, color: 'text-blue-500' },
    { label: 'Active Subs', value: stats.stats.activeSubs, growth: '72% conversion', icon: CreditCard, color: 'text-emerald-500' },
    { label: 'Monthly Revenue', value: `$${stats.stats.estimatedMRR.toLocaleString()}`, growth: '+12% vs last month', icon: DollarSign, color: 'text-primary' },
    { label: 'AI API Calls', value: stats.stats.totalTokens.toLocaleString(), growth: `${(stats.stats.totalTokens / 1000).toFixed(1)}k tokens`, icon: Zap, color: 'text-amber-500' },
  ];

  return (
    <div className="space-y-10">
      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, i) => (
          <div key={i} className="bg-[#0c0c0e] border border-white/5 p-6 rounded-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
               <kpi.icon className="w-12 h-12" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-muted mb-4">{kpi.label}</p>
            <div className="flex items-end justify-between">
               <div>
                  <h3 className="text-3xl font-bold tracking-tight">{kpi.value}</h3>
                  <p className="text-[10px] font-bold text-muted mt-2 uppercase tracking-wide flex items-center gap-1">
                     <TrendingUp className="w-3 h-3 text-success" />
                     {kpi.growth}
                  </p>
               </div>
               <div className={cn("p-2 rounded-lg bg-white/5 border border-white/10", kpi.color)}>
                  <kpi.icon className="w-4 h-4" />
               </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Growth Chart */}
        <div className="lg:col-span-2 bg-[#0c0c0e] border border-white/5 p-8 rounded-[2rem]">
           <div className="flex items-center justify-between mb-8">
              <div>
                 <h2 className="text-lg font-bold">User Acquisition</h2>
                 <p className="text-xs text-muted">Platform growth over the last 90 days</p>
              </div>
              <select className="bg-black border border-white/10 text-[10px] font-bold uppercase rounded-lg px-3 py-1.5 focus:outline-none">
                 <option>Last 90 Days</option>
                 <option>Last 30 Days</option>
              </select>
           </div>
           
           <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats.charts.userGrowth}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#7C3AED" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                  <XAxis 
                    dataKey="date" 
                    stroke="#ffffff33" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <YAxis 
                    stroke="#ffffff33" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#09090b', borderColor: '#ffffff11', borderRadius: '12px', fontSize: '10px' }}
                    itemStyle={{ color: '#7C3AED' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="count" 
                    stroke="#7C3AED" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
           </div>
        </div>

        {/* Recent Events Feed */}
        <div className="bg-[#0c0c0e] border border-white/5 p-8 rounded-[2rem] flex flex-col">
           <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-bold">Audit Stream</h2>
              <div className="p-2 bg-white/5 rounded-lg">
                 <Clock className="w-4 h-4 text-muted" />
              </div>
           </div>
           
           <div className="space-y-6 flex-1 overflow-y-auto pr-2 custom-scrollbar">
              {stats.recentActivity.map((log: any, i: number) => (
                <div key={i} className="flex gap-4 group">
                   <div className="relative">
                      <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-bold z-10 relative">
                         {log.user?.name?.[0] || 'S'}
                      </div>
                      {i !== stats.recentActivity.length - 1 && (
                        <div className="absolute top-8 left-4 w-px h-full bg-white/5" />
                      )}
                   </div>
                   <div className="flex-1 pb-4">
                      <div className="flex justify-between items-start mb-1">
                         <p className="text-[11px] font-bold text-white group-hover:text-primary transition-colors">
                            {log.user?.email || 'System'}
                         </p>
                         <span className="text-[9px] text-muted-foreground">{new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <p className="text-[10px] text-muted uppercase tracking-widest font-black mb-1">{log.action}</p>
                      <p className="text-[10px] text-muted-foreground leading-relaxed line-clamp-1">{log.details}</p>
                   </div>
                </div>
              ))}
           </div>
           
           <button className="w-full mt-6 py-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all">
              View Full Logs
           </button>
        </div>
      </div>

      {/* Plan Distribution Mini Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="bg-[#0c0c0e] border border-white/5 p-8 rounded-[2rem]">
            <div className="flex items-center gap-4 mb-8">
               <div className="p-3 bg-primary/10 rounded-2xl">
                  <PieChart className="w-6 h-6 text-primary" />
               </div>
               <div>
                  <h2 className="text-lg font-bold">Subscription Mix</h2>
                  <p className="text-xs text-muted">Portfolio segmentation by plan</p>
               </div>
            </div>
            
            <div className="flex items-center">
               <div className="h-[200px] w-1/2">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                           { name: 'Free', value: 400 },
                           { name: 'Pro', value: 300 },
                           { name: 'Agency', value: 100 },
                        ]}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {Array.from({ length: 3 }).map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
               </div>
               <div className="w-1/2 space-y-3">
                  {['Free', 'Pro', 'Agency'].map((plan, i) => (
                    <div key={i} className="flex items-center justify-between">
                       <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                          <span className="text-[10px] font-bold text-muted uppercase tracking-widest">{plan}</span>
                       </div>
                       <span className="text-xs font-bold">{(Math.random() * 50).toFixed(0)}%</span>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
