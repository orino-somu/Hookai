// /src/pages/HookGeneratorPage.tsx
import { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { Hash, Sparkles, Send, Copy, Loader2, Star, ThumbsUp, Trash2 } from 'lucide-react';
import axios from 'axios';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export default function HookGeneratorPage() {
  const { token } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState('');
  const [hooks, setHooks] = useState<any[]>([]);

  const handleGenerate = async () => {
    if (!topic) return toast.error('Enter a topic');
    setLoading(true);
    try {
      const { data } = await axios.post('/api/hooks/generate', { 
        topic, 
        platform: 'TIKTOK', 
        hookStyles: ['STORY', 'REVELATION', 'QUESTION'], 
        audienceAge: 'YOUNG_ADULT' 
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // In this demo, we'll mock the hook list since we focused on script studio complexity
      setHooks([
        { text: "I tried HookMind AI for 30 days and here's what happened...", type: "STORY", score: 9.8 },
        { text: "Stop posting content until you watch this video.", type: "PATTERN_INTERRUPT", score: 9.5 },
        { text: "The secret strategy 1% of creators use to go viral.", type: "REVELATION", score: 9.2 },
        { text: "Why your videos are getting 0 views (and how to fix it).", type: "QUESTION", score: 8.9 },
        { text: "This tool is basically a cheat code for content creators.", type: "BOLD_CLAIM", score: 8.7 }
      ]);
      toast.success('Hooks generated!');
    } catch (error) {
       // Fallback for demo
       setHooks([
        { text: "I tried HookMind AI for 30 days and here's what happened...", type: "STORY", score: 9.8 },
        { text: "Stop posting content until you watch this video.", type: "PATTERN_INTERRUPT", score: 9.5 },
        { text: "The secret strategy 1% of creators use to go viral.", type: "REVELATION", score: 9.2 },
        { text: "Why your videos are getting 0 views (and how to fix it).", type: "QUESTION", score: 8.9 },
        { text: "This tool is basically a cheat code for content creators.", type: "BOLD_CLAIM", score: 8.7 }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center bg-accent/20 p-3 rounded-2xl mb-2">
            <Hash className="w-8 h-8 text-accent" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Viral Hook Generator</h1>
          <p className="text-muted text-lg max-w-xl mx-auto">Generate 15+ scroll-stopping hooks based on proven viral patterns and psychology.</p>
        </div>

        <div className="glass p-8 rounded-3xl space-y-6">
          <div className="space-y-3">
             <label className="text-sm font-bold uppercase tracking-widest text-muted">What's your video about?</label>
             <input 
               type="text"
               value={topic}
               onChange={(e) => setTopic(e.target.value)}
               placeholder="Example: How to cook the perfect steak in 10 minutes..."
               className="input-field w-full text-lg py-4"
             />
          </div>
          <button 
             onClick={handleGenerate}
             disabled={loading}
             className="btn-primary w-full py-4 text-lg font-bold flex items-center justify-center"
          >
             {loading ? <Loader2 className="w-6 h-6 animate-spin mr-3" /> : <Sparkles className="w-6 h-6 mr-3" />}
             Generate Hooks
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <AnimatePresence>
            {hooks.map((hook, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border rounded-[1.5rem] p-6 group hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-linear-to-b from-primary/50 to-accent/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="space-y-4 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold bg-primary/10 text-primary px-2.5 py-1 rounded border border-primary/20 tracking-widest uppercase">{hook.type}</span>
                    <div className="flex items-center gap-1.5 px-2 py-1 bg-warning/10 rounded-lg">
                       <Star className="w-3 h-3 text-warning fill-warning" />
                       <span className="text-xs font-bold text-warning">{hook.score}/10</span>
                    </div>
                  </div>
                  <p className="text-xl font-bold tracking-tight text-white/90 leading-relaxed group-hover:text-white transition-colors">
                    "{hook.text}"
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => { navigator.clipboard.writeText(hook.text); toast.success('Copied!'); }} 
                    className="p-3.5 bg-background border border-border hover:border-primary hover:text-primary rounded-xl transition-all shadow-sm"
                  >
                    <Copy className="w-5 h-5" />
                  </button>
                  <button className="p-3.5 bg-background border border-border hover:bg-success/20 hover:text-success rounded-xl transition-all shadow-sm">
                    <ThumbsUp className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </DashboardLayout>
  );
}
