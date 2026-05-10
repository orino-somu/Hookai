// /src/pages/admin/UserManagement.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  Users, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Shield, 
  Ban, 
  Edit2, 
  ExternalLink,
  Mail,
  Calendar,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { toast } from 'sonner';

export default function UserManagement() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterPlan, setFilterPlan] = useState('');

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/admin/users?q=${search}&plan=${filterPlan}`);
      setUsers(data);
    } catch (error) {
      toast.error('Failed to sync user records');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(fetchUsers, 300);
    return () => clearTimeout(timer);
  }, [search, filterPlan]);

  const handleUpdateUser = async (userId: string, updates: any) => {
    try {
      await axios.patch(`/api/admin/users/${userId}`, updates);
      toast.success('User record updated');
      fetchUsers();
    } catch (error) {
      toast.error('Modification failed');
    }
  };

  return (
    <div className="space-y-8">
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
         <div className="relative w-full md:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted group-focus-within:text-primary transition-colors" />
            <input 
              type="text"
              placeholder="Search by name, email or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#0c0c0e] border border-white/5 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
         </div>

         <div className="flex items-center gap-4 w-full md:w-auto">
            <select 
              value={filterPlan}
              onChange={(e) => setFilterPlan(e.target.value)}
              className="bg-[#0c0c0e] border border-white/5 rounded-xl px-4 py-3 text-[10px] font-black uppercase tracking-widest focus:outline-none"
            >
               <option value="">All Plans</option>
               <option value="FREE">Free Tier</option>
               <option value="PRO">Pro Plan</option>
               <option value="AGENCY">Agency</option>
            </select>
            <button className="flex items-center gap-2 bg-white/5 border border-white/5 hover:bg-white/10 px-6 py-3 rounded-xl transition-all font-bold uppercase tracking-widest text-[10px]">
               <Filter className="w-4 h-4" />
               Advanced Filters
            </button>
         </div>
      </div>

      {/* User Table */}
      <div className="bg-[#0c0c0e] border border-white/5 rounded-[2rem] overflow-hidden">
         <div className="overflow-x-auto">
            <table className="w-full border-collapse">
               <thead>
                  <tr className="border-b border-white/5 text-left bg-black/20">
                     <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-muted">Identity</th>
                     <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-muted">Access Level</th>
                     <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-muted">Activity</th>
                     <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-muted text-right">Operations</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                  {loading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                      <tr key={i} className="animate-pulse">
                         <td colSpan={4} className="px-8 py-8 h-12 bg-white/2 rounded-lg m-2" />
                      </tr>
                    ))
                  ) : users.length === 0 ? (
                    <tr>
                       <td colSpan={4} className="px-8 py-20 text-center text-muted text-sm italic">
                          No personnel found matching the current directives.
                       </td>
                    </tr>
                  ) : users.map((user) => (
                    <tr key={user.id} className="group hover:bg-white/[0.02] transition-colors">
                       <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white text-xs font-black shadow-lg shadow-primary/5">
                                {user.name?.[0]}
                             </div>
                             <div>
                                <p className="text-[13px] font-bold group-hover:text-primary transition-colors">{user.name}</p>
                                <div className="flex items-center gap-1.5 text-muted mt-0.5">
                                   <Mail className="w-3 h-3" />
                                   <span className="text-[10px] lowercase">{user.email}</span>
                                </div>
                             </div>
                          </div>
                       </td>
                       <td className="px-8 py-6">
                          <div className="flex flex-col gap-2">
                             <span className={cn(
                               "inline-flex w-fit px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest border",
                               user.plan === 'AGENCY' ? "bg-amber-500/10 text-amber-500 border-amber-500/20" :
                               user.plan === 'PRO' ? "bg-primary/10 text-primary border-primary/20" :
                               "bg-muted/10 text-muted border-white/10"
                             )}>
                                {user.plan} PLAN
                             </span>
                             <div className="flex items-center gap-2 text-[9px] text-muted-foreground font-bold">
                                {user.role === 'ADMIN' ? (
                                  <Shield className="w-3 h-3 text-error" />
                                ) : (
                                  <Users className="w-3 h-3" />
                                )}
                                {user.role}
                             </div>
                          </div>
                       </td>
                       <td className="px-8 py-6">
                          <div className="space-y-1.5">
                             <div className="flex items-center gap-2">
                                <div className="h-1 flex-1 bg-white/5 rounded-full overflow-hidden">
                                   <div className="h-full bg-primary" style={{ width: '45%' }} />
                                </div>
                                <span className="text-[10px] font-bold text-muted">{user._count.scripts} Scripts</span>
                             </div>
                             <div className="flex items-center gap-3 text-[10px] text-muted-foreground font-medium">
                                <Calendar className="w-3 h-3" />
                                <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
                             </div>
                          </div>
                       </td>
                       <td className="px-8 py-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                             <button 
                               onClick={() => handleUpdateUser(user.id, { plan: user.plan === 'FREE' ? 'PRO' : 'FREE' })}
                               className="p-2.5 rounded-lg border border-white/5 hover:border-primary/50 hover:bg-primary/5 transition-all text-muted-foreground hover:text-primary"
                               title="Upgrade/Downgrade"
                             >
                                <Edit2 className="w-4 h-4" />
                             </button>
                             <button className="p-2.5 rounded-lg border border-white/5 hover:border-error/50 hover:bg-error/5 transition-all text-muted-foreground hover:text-error">
                                <Ban className="w-4 h-4" />
                             </button>
                             <button className="p-2.5 rounded-lg border border-white/5 hover:bg-white/10 transition-all text-muted-foreground">
                                <MoreHorizontal className="w-4 h-4" />
                             </button>
                          </div>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>

         {/* Pagination Footer */}
         <div className="px-8 py-5 border-t border-white/5 bg-black/20 flex items-center justify-between">
            <p className="text-[10px] font-bold text-muted uppercase tracking-widest">
               Displaying <span className="text-white">{users.length}</span> personnel records
            </p>
            <div className="flex gap-2">
               <button className="px-4 py-2 bg-white/5 border border-white/5 rounded-lg text-[10px] font-black uppercase tracking-widest disabled:opacity-30" disabled>Previous</button>
               <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">Next Cluster</button>
            </div>
         </div>
      </div>
    </div>
  );
}
