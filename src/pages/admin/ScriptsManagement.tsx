// /src/pages/admin/ScriptsManagement.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  FileText, 
  Search, 
  Trash2, 
  Eye, 
  MoreVertical, 
  Filter,
  Flame,
  Globe,
  Youtube,
  Twitter,
  Instagram
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { toast } from 'sonner';

export default function ScriptsManagement() {
  const [scripts, setScripts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScripts = async () => {
      try {
        // Mocking a fetch for now since we don't have a dedicated admin scripts endpoint yet
        // In a real app, this would be /api/admin/scripts
        const { data } = await axios.get('/api/scripts');
        setScripts(data);
      } catch (error) {
        console.error('Failed to fetch script database');
      } finally {
        setLoading(false);
      }
    };
    fetchScripts();
  }, []);

  const getPlatformIcon = (platform: string) => {
    switch (platform?.toUpperCase()) {
      case 'YOUTUBE': return <Youtube className="w-4 h-4 text-error" />;
      case 'TIKTOK': return <div className="w-4 h-4 bg-white text-black flex items-center justify-center rounded-sm font-black text-[8px]">T</div>;
      case 'X': return <Twitter className="w-4 h-4 text-blue-400" />;
      case 'INSTAGRAM': return <Instagram className="w-4 h-4 text-pink-500" />;
      default: return <Globe className="w-4 h-4 text-muted" />;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
         <div>
            <h2 className="text-2xl font-bold tracking-tight">Script Archive</h2>
            <p className="text-sm text-muted font-medium">Monitoring {scripts.length} generated video architectures</p>
         </div>
         <div className="flex items-center gap-4">
            <div className="relative">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
               <input 
                 type="text" 
                 placeholder="Search by title..." 
                 className="bg-card border border-border rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all w-64"
               />
            </div>
            <button className="p-2 border border-border rounded-xl hover:bg-white/5">
               <Filter className="w-4 h-4 text-muted" />
            </button>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
         {loading ? (
           Array.from({ length: 6 }).map((_, i) => (
             <div key={i} className="h-64 bg-card border border-border rounded-3xl animate-pulse" />
           ))
         ) : scripts.length === 0 ? (
           <div className="col-span-full py-40 text-center glass border-dashed border-2 border-border rounded-[3rem]">
              <FileText className="w-12 h-12 text-muted mx-auto mb-4 opacity-20" />
              <p className="text-muted font-bold uppercase tracking-widest text-[10px]">No scripts archived in this sector</p>
           </div>
         ) : scripts.map((script) => (
           <div key={script.id} className="bg-card border border-border rounded-3xl p-6 group hover:border-primary/50 transition-all flex flex-col justify-between">
              <div>
                 <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                       {getPlatformIcon(script.platform)}
                       <span className="text-[10px] font-black uppercase tracking-widest text-muted">{script.platform || 'General'}</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-2 py-0.5 bg-warning/10 text-warning rounded border border-warning/20">
                       <Flame className="w-3 h-3 fill-warning" />
                       <span className="text-[10px] font-bold">SCR: 8.4</span>
                    </div>
                 </div>
                 <h3 className="text-lg font-bold tracking-tight mb-3 line-clamp-1 group-hover:text-primary transition-colors">
                    {script.topic || 'Untitled Intelligence'}
                 </h3>
                 <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed mb-6 italic">
                    "{script.content?.substring(0, 150)}..."
                 </p>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-white/5">
                 <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-bold">
                       {script.user?.name?.[0] || 'U'}
                    </div>
                    <span className="text-[10px] font-bold text-muted uppercase tracking-widest truncate w-24">
                       {script.user?.name || 'Anonymous User'}
                    </span>
                 </div>
                 <div className="flex items-center gap-2">
                    <button className="p-2 rounded-lg bg-white/5 border border-white/5 hover:border-primary/50 text-muted hover:text-primary transition-all">
                       <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg bg-white/5 border border-white/5 hover:border-error/50 text-muted hover:text-error transition-all">
                       <Trash2 className="w-4 h-4" />
                    </button>
                 </div>
              </div>
           </div>
         ))}
      </div>
    </div>
  );
}
