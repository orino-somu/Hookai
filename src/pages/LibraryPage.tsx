// /src/pages/LibraryPage.tsx
import { useState, useEffect } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { Search, Filter, MoreVertical, Eye, Trash2, Calendar, FileText } from 'lucide-react';
import axios from 'axios';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';
import { motion } from 'motion/react';
import { format } from 'date-fns';

export default function LibraryPage() {
  const [scripts, setScripts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuthStore();

  useEffect(() => {
    const fetchScripts = async () => {
      try {
        const { data } = await axios.get('/api/scripts', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setScripts(data);
      } catch (error) {
        toast.error('Failed to load library');
      } finally {
        setLoading(false);
      }
    };
    fetchScripts();
  }, [token]);

  const removeScript = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Are you sure you want to delete this script?')) return;
    try {
       await axios.delete(`/api/scripts/${id}`, {
         headers: { Authorization: `Bearer ${token}` }
       });
       setScripts(prev => prev.filter(s => s.id !== id));
       toast.success('Script removed');
    } catch (error) {
       toast.error('Failed to delete');
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold">Your Library</h1>
            <p className="text-muted">Manage your generated scripts and viral hooks.</p>
          </div>
          <div className="flex items-center space-x-3">
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input type="text" placeholder="Search scripts..." className="input-field pl-10 w-64" />
             </div>
             <button className="p-2 border border-border rounded-lg hover:bg-white/5 transition-all text-muted">
                <Filter className="w-5 h-5" />
             </button>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="glass h-48 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : scripts.length === 0 ? (
          <div className="h-96 flex flex-col items-center justify-center text-center glass rounded-3xl border-dashed border-2 border-border">
            <FileText className="w-16 h-16 text-muted mb-4 opacity-50" />
            <h3 className="text-xl font-bold text-muted">Library is Empty</h3>
            <p className="text-muted mt-2">Start generating scripts to see them here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scripts.map((script, i) => (
              <motion.div
                key={script.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass p-6 rounded-2xl hover:border-primary/50 transition-all cursor-pointer group flex flex-col justify-between h-56"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded border border-primary/20 uppercase tracking-widest">{script.platform}</span>
                    <button className="text-muted hover:text-white"><MoreVertical className="w-4 h-4" /></button>
                  </div>
                  <h3 className="text-lg font-bold line-clamp-2 leading-tight group-hover:text-primary transition-colors">{script.title}</h3>
                  <p className="text-xs text-muted mt-2 line-clamp-2">{script.topic}</p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
                   <div className="flex items-center space-x-2 text-xs text-muted">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{format(new Date(script.createdAt), 'MMM d, yyyy')}</span>
                   </div>
                   <div className="flex space-x-2">
                     <button className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-muted hover:text-accent"><Eye className="w-4 h-4" /></button>
                     <button onClick={(e) => removeScript(script.id, e)} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-muted hover:text-error"><Trash2 className="w-4 h-4" /></button>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
