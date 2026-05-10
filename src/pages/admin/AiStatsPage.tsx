// /src/pages/admin/AiStatsPage.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  Zap, 
  Cpu, 
  BarChart2, 
  TrendingUp, 
  ShieldAlert, 
  Database,
  ArrowDownLeft,
  Activity
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, AreaChart, Area } from 'recharts';

export default function AiStatsPage() {
  const [usage, setUsage] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsage = async () => {
      try {
        const { data } = await axios.get('/api/admin/ai-usage');
        setUsage(data);
      } catch (error) {
        console.error('Failed to fetch diagnostics');
      } finally {
        setLoading(false);
      }
    };
    fetchUsage();
  }, []);

  const enginePerformance = [
    { name: 'Script Engine', tokens: '14.2m', efficiency: '98.2%', latency: '2.4s' },
    { name: 'Hook Lab', tokens: '4.8m', efficiency: '99.1%', latency: '0.8s' },
    { name: 'Tone Scaler', tokens: '2.1m', efficiency: '97.5%', latency: '1.2s' },
    { name: 'Research AI', tokens: '9.4m', efficiency: '94.0%', latency: '4.1s' },
  ];

  return (
    <div className="space-y-10">
      {/* Infrastructure KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-[#0c0c0e] border border-white/5 p-8 rounded-[2rem] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 blur-[40px]" />
            <Cpu className="w-8 h-8 text-primary mb-6" />
            <p className="text-[10px] font-black uppercase tracking-widest text-muted mb-2">Model Version</p>
            <h3 className="text-2xl font-bold tracking-tight">Gemini 2.0 Flash</h3>
            <div className="flex items-center gap-2 mt-4">
               <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
               <span className="text-[10px] font-bold text-success uppercase tracking-widest">Inference Stable</span>
            </div>
         </div>

         <div className="bg-[#0c0c0e] border border-white/5 p-8 rounded-[2rem] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 blur-[40px]" />
            <Zap className="w-8 h-8 text-amber-500 mb-6" />
            <p className="text-[10px] font-black uppercase tracking-widest text-muted mb-2">Total Compute</p>
            <h3 className="text-2xl font-bold tracking-tight">32.4M Tokens</h3>
            <div className="flex items-center gap-2 mt-4">
               <TrendingUp className="w-3 h-3 text-amber-500" />
               <span className="text-[10px] font-bold text-muted uppercase tracking-widest">+4% vs Yesterday</span>
            </div>
         </div>

         <div className="bg-[#0c0c0e] border border-white/5 p-8 rounded-[2rem] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 blur-[40px]" />
            <Activity className="w-8 h-8 text-blue-500 mb-6" />
            <p className="text-[10px] font-black uppercase tracking-widest text-muted mb-2">Platform Latency</p>
            <h3 className="text-2xl font-bold tracking-tight">1.8s Avg</h3>
            <div className="flex items-center gap-2 mt-4 text-blue-500">
               <ArrowDownLeft className="w-3 h-3" />
               <span className="text-[10px] font-bold uppercase tracking-widest">-120ms optimized</span>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         {/* Usage Log Table */}
         <div className="bg-[#0c0c0e] border border-white/5 rounded-[2rem] p-8">
            <div className="flex items-center justify-between mb-8">
               <h2 className="text-lg font-bold">Real-time Inference Log</h2>
               <span className="text-[10px] font-black text-muted uppercase tracking-[0.2em] border border-white/10 px-3 py-1 rounded-full">LIVE Diagnostics</span>
            </div>
            
            <div className="space-y-4">
               {loading ? (
                  Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-12 bg-white/5 rounded-xl animate-pulse" />)
               ) : usage.map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-black/40 border border-white/5 rounded-2xl hover:border-primary/30 transition-all cursor-default">
                     <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center font-bold text-xs">
                           {item.user?.name?.[0]}
                        </div>
                        <div>
                           <p className="text-[11px] font-bold text-white leading-none mb-1">{item.user?.email}</p>
                           <p className="text-[9px] text-muted-foreground uppercase tracking-widest font-black">{item.action}</p>
                        </div>
                     </div>
                     <div className="text-right">
                        <p className="text-sm font-bold font-mono text-primary">{item.tokensUsed} tokens</p>
                        <p className="text-[9px] text-muted-foreground font-medium uppercase tracking-widest">
                           {new Date(item.createdAt).toLocaleTimeString()}
                        </p>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* Engine Distribution */}
         <div className="space-y-8">
            <div className="bg-[#0c0c0e] border border-white/5 rounded-[2rem] p-8">
               <h2 className="text-lg font-bold mb-8">Intelligence Performance</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {enginePerformance.map((engine, i) => (
                    <div key={i} className="p-6 border border-white/5 rounded-2xl bg-black/20 hover:bg-white/5 transition-all">
                       <div className="flex justify-between items-start mb-4">
                          <p className="text-[10px] font-black uppercase tracking-widest text-muted">{engine.name}</p>
                          <Zap className="w-3 h-3 text-primary" />
                       </div>
                       <h4 className="text-xl font-bold mb-2">{engine.tokens}</h4>
                       <div className="flex justify-between text-[10px] font-bold border-t border-white/5 pt-3 mt-3">
                          <span className="text-success uppercase tracking-widest">{engine.efficiency} Success</span>
                          <span className="text-muted-foreground uppercase tracking-widest">{engine.latency} RT</span>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="bg-[#0c0c0e] border border-white/5 rounded-[2rem] p-8">
               <h2 className="text-lg font-bold mb-8">Compute Volatility</h2>
               <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                       { name: '00:00', tokens: 400 },
                       { name: '04:00', tokens: 300 },
                       { name: '08:00', tokens: 800 },
                       { name: '12:00', tokens: 1200 },
                       { name: '16:00', tokens: 1500 },
                       { name: '20:00', tokens: 900 },
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                      <XAxis dataKey="name" stroke="#ffffff22" fontSize={10} axisLine={false} tickLine={false} />
                      <YAxis hide />
                      <Tooltip 
                        cursor={{ fill: '#ffffff05' }}
                        contentStyle={{ backgroundColor: '#09090b', borderColor: '#ffffff11', borderRadius: '12px' }}
                      />
                      <Bar dataKey="tokens" fill="#7C3AED" radius={[4, 4, 0, 0]} barSize={30} />
                    </BarChart>
                  </ResponsiveContainer>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
