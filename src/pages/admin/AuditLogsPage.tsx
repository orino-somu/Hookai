// /src/pages/admin/AuditLogsPage.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Activity, Search, ShieldCheck, Terminal, Clock, Filter, Database } from 'lucide-react';

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const { data } = await axios.get('/api/admin/dashboard');
        setLogs(data.recentActivity || []);
      } catch (error) {
        console.error('Failed to sync system logs');
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center bg-[#0c0c0e] border border-white/5 p-8 rounded-[2rem]">
         <div>
            <div className="flex items-center gap-3 mb-2">
               <div className="p-2 bg-error/10 rounded-lg">
                  <Terminal className="w-5 h-5 text-error" />
               </div>
               <h2 className="text-2xl font-bold tracking-tight">System Integrity Log</h2>
            </div>
            <p className="text-sm text-muted font-medium">Monitoring cluster-wide administrative and user operations</p>
         </div>
      </div>

      <div className="bg-[#0c0c0e] border border-white/5 rounded-[2rem] overflow-hidden">
         <div className="p-6 border-b border-white/5 flex items-center justify-between bg-black/20">
            <div className="flex items-center gap-4">
               <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted">Real-time Stream</span>
               </div>
            </div>
            <div className="flex items-center gap-2">
               <button className="p-2 rounded-lg bg-white/5 border border-white/5 text-muted hover:text-white transition-all">
                  <Filter className="w-4 h-4" />
               </button>
            </div>
         </div>

         <div className="divide-y divide-white/5">
            {loading ? (
               Array.from({ length: 8 }).map((_, i) => <div key={i} className="h-20 bg-white/2 animate-pulse" />)
            ) : logs.length === 0 ? (
               <div className="p-20 text-center text-muted italic text-sm">No recent transactions detected in this buffer.</div>
            ) : logs.map((log, i) => (
               <div key={i} className="group p-6 flex flex-col md:flex-row md:items-center gap-6 hover:bg-white/[0.02] transition-colors">
                  <div className="flex items-center gap-4 md:w-64 shrink-0">
                     <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-bold">
                        {log.user?.name?.[0] || 'S'}
                     </div>
                     <div>
                        <p className="text-[11px] font-bold text-white leading-none mb-1">{log.user?.email || 'SYSTEM'}</p>
                        <div className="flex items-center gap-2 text-muted">
                           <Clock className="w-3 h-3" />
                           <span className="text-[9px] font-medium">{new Date(log.createdAt).toLocaleString()}</span>
                        </div>
                     </div>
                  </div>

                  <div className="flex-1">
                     <span className="inline-block px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-widest text-muted mb-2">
                        {log.action}
                     </span>
                     <p className="text-xs text-muted-foreground font-mono bg-black/40 p-3 rounded-lg border border-white/5">
                        {log.details || 'Parameter block empty'}
                     </p>
                  </div>

                  <div className="md:w-32 shrink-0 text-right">
                     <span className="text-[10px] font-bold text-muted uppercase tracking-widest border border-white/5 px-2 py-1 rounded">
                        IPv4: {log.ipAddress || 'Internal'}
                     </span>
                  </div>
               </div>
            ))}
         </div>
      </div>
    </div>
  );
}
