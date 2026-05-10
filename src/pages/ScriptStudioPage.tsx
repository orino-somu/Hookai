// /src/pages/ScriptStudioPage.tsx
import { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { 
  Sparkles, 
  Send, 
  Copy, 
  RefreshCw, 
  ChevronRight, 
  Check, 
  Target, 
  Users, 
  Clock, 
  Flame,
  LayoutTemplate,
  Zap
} from 'lucide-react';
import axios from 'axios';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export default function ScriptStudioPage() {
  const { token } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    topic: '',
    platform: 'YOUTUBE',
    niche: 'TECH',
    tone: 'EDUCATIONAL',
    scriptLength: 'SHORT',
    psychTriggers: [] as string[],
    audienceAge: 'YOUNG_ADULT'
  });
  const [result, setResult] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'script' | 'hooks' | 'metadata'>('script');

  const triggers = [
    'Fear of Missing Out', 'Curiosity Gap', 'Social Proof', 'Urgency', 
    'Authority', 'Reciprocity', 'Scarcity', 'Relatability', 'Storytelling'
  ];

  const handleToggleTrigger = (t: string) => {
    setFormData(prev => ({
      ...prev,
      psychTriggers: prev.psychTriggers.includes(t) 
        ? prev.psychTriggers.filter(x => x !== t) 
        : [...prev.psychTriggers, t]
    }));
  };

  const handleGenerate = async () => {
    if (!formData.topic) return toast.error('Please enter a topic');
    setLoading(true);
    setResult(null);
    try {
      const { data } = await axios.post('/api/scripts/generate', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Backend returns stringified JSON due to SQLite/Prisma setup in my previous turn
      setResult({
        ...data,
        fullScript: JSON.parse(data.fullScript),
        hookVariations: JSON.parse(data.hookVariations),
        metadata: JSON.parse(data.metadata),
        retentionArc: JSON.parse(data.retentionArc)
      });
      toast.success('Script generated successfully!');
    } catch (error: any) {
      toast.error('AI generation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col xl:flex-row h-full gap-8">
        {/* Left Panel: Inputs */}
        <div className="flex-1 space-y-6 max-w-xl">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-primary/20 p-2 rounded-lg">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold">Script Studio</h1>
          </div>

          <div className="glass p-6 rounded-2xl space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">What is your video about?</label>
              <textarea
                placeholder="Example: How to grow on TikTok using HookMind AI in 2025..."
                className="input-field w-full h-32 resize-none"
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Platform</label>
                <select 
                  className="input-field w-full bg-surface"
                  value={formData.platform}
                  onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                >
                  <option value="YOUTUBE">YouTube</option>
                  <option value="TIKTOK">TikTok</option>
                  <option value="REELS">Reels</option>
                  <option value="SHORTS">Shorts</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Script Length</label>
                <select 
                  className="input-field w-full bg-surface"
                  value={formData.scriptLength}
                  onChange={(e) => setFormData({ ...formData, scriptLength: e.target.value })}
                >
                  <option value="SHORT">Short (&#60; 60s)</option>
                  <option value="MEDIUM">Medium (1-5 min)</option>
                  <option value="LONG">Long (5+ min)</option>
                </select>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium">Psychological Triggers</label>
              <div className="flex flex-wrap gap-2">
                {triggers.map(t => (
                  <button
                    key={t}
                    onClick={() => handleToggleTrigger(t)}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-xs font-medium transition-all border",
                      formData.psychTriggers.includes(t) 
                        ? "bg-primary/20 border-primary text-primary" 
                        : "bg-surface border-border text-muted hover:border-primary/50"
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="btn-primary w-full py-4 flex items-center justify-center font-bold relative overflow-hidden"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 mr-2 animate-spin" /> Generating Magic...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-3" /> Generate Script
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Panel: Output */}
        <div className="flex-[1.5] min-h-[600px]">
          <AnimatePresence mode="wait">
            {!result && !loading ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center glass rounded-2xl border-dashed border-2 border-border/50 text-center p-12"
              >
                <div className="bg-white/5 p-6 rounded-full mb-6">
                  <LayoutTemplate className="w-16 h-16 text-muted" />
                </div>
                <h2 className="text-xl font-bold text-muted">Ready to Create?</h2>
                <p className="text-muted max-w-sm mt-2">Fill out the inputs on the left to generate your retention-focused script.</p>
              </motion.div>
            ) : loading ? (
                 <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="h-full flex flex-col items-center justify-center glass rounded-2xl p-12"
                 >
                    <div className="relative">
                      <div className="w-24 h-24 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                      <Sparkles className="absolute inset-0 m-auto w-8 h-8 text-primary animate-pulse" />
                    </div>
                    <h2 className="text-2xl font-bold mt-8">HookMind AI is thinking...</h2>
                    <p className="text-muted mt-2">Analyzing niches, viral patterns, and psychology.</p>
                    
                    <div className="w-64 h-1.5 bg-white/5 rounded-full mt-12 overflow-hidden">
                       <motion.div 
                         className="h-full bg-primary"
                         initial={{ width: 0 }}
                         animate={{ width: '100%' }}
                         transition={{ duration: 15, ease: 'linear' }}
                       />
                    </div>
                 </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col h-full glass rounded-2xl overflow-hidden"
              >
                {/* Tabs */}
                <div className="flex border-b border-border">
                  {(['script', 'hooks', 'metadata'] as const).map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={cn(
                        "flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-all",
                        activeTab === tab ? "text-primary border-b-2 border-primary bg-primary/5" : "text-muted hover:text-white"
                      )}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Content Area */}
                <div className="flex-1 p-8 overflow-y-auto space-y-8">
                  {activeTab === 'script' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pr-2">
                       <div className="p-6 bg-card border border-border rounded-2xl relative overflow-hidden group shadow-lg">
                          <div className="absolute top-0 left-0 w-1.5 h-full bg-primary"></div>
                          <div className="flex justify-between items-start mb-4">
                             <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded uppercase tracking-widest border border-primary/20">Winning Hook</span>
                             <div className="flex gap-2">
                                <span className="text-[10px] text-success font-bold bg-success/10 px-2 py-1 rounded border border-success/20">{result.hookScore}/10 SCORE</span>
                                <button 
                                  onClick={() => copyToClipboard(result.fullScript.intro)}
                                  className="p-1 hover:bg-white/5 rounded transition-all text-muted"
                                >
                                  <Copy className="w-3.5 h-3.5" />
                                </button>
                             </div>
                          </div>
                          <p className="text-xl font-bold leading-relaxed tracking-tight">
                            "{result.fullScript.intro}"
                          </p>
                       </div>

                       <div className="space-y-6">
                         <div className="space-y-4">
                            <div className="flex items-center gap-4">
                               <div className="w-8 h-8 rounded-full bg-border flex items-center justify-center text-xs font-bold font-mono">01</div>
                               <div className="h-px flex-1 bg-border/50"></div>
                               <span className="text-[10px] font-bold text-muted uppercase tracking-widest">Introduction</span>
                            </div>
                            <div className="pl-12">
                              <p className="text-text/80 leading-relaxed text-sm">{result.fullScript.body[0]}</p>
                            </div>
                         </div>

                         <div className="space-y-4">
                            <div className="flex items-center gap-4">
                               <div className="w-8 h-8 rounded-full bg-border flex items-center justify-center text-xs font-bold font-mono">02</div>
                               <div className="h-px flex-1 bg-border/50"></div>
                               <span className="text-[10px] font-bold text-muted uppercase tracking-widest">Core Points</span>
                            </div>
                            <div className="pl-12 space-y-4">
                              {result.fullScript.body.slice(1).map((point: string, i: number) => (
                                <p key={i} className="text-text/80 leading-relaxed text-sm border-l-2 border-primary/10 pl-4">{point}</p>
                              ))}
                            </div>
                         </div>

                         <div className="space-y-4">
                            <div className="flex items-center gap-4">
                               <div className="w-8 h-8 rounded-full bg-border flex items-center justify-center text-xs font-bold font-mono">03</div>
                               <div className="h-px flex-1 bg-border/50"></div>
                               <span className="text-[10px] font-bold text-muted uppercase tracking-widest">CTA & Outro</span>
                            </div>
                            <div className="pl-12">
                              <p className="text-text/80 leading-relaxed text-sm bg-primary/5 p-4 rounded-xl border border-primary/10">{result.fullScript.conclusion} {result.fullScript.cta}</p>
                            </div>
                         </div>
                       </div>

                       {/* Visual Indicator of Retention */}
                       <div className="mt-8 p-6 bg-surface border border-dashed border-border rounded-2xl">
                          <div className="flex justify-between items-center mb-6">
                             <span className="text-[10px] font-bold text-muted uppercase tracking-widest">Predicted Retention Arc</span>
                             <div className="flex items-center gap-2">
                                <Zap className="w-3 h-3 text-accent" />
                                <span className="text-xs font-bold text-accent">84% Engagement Avg.</span>
                             </div>
                          </div>
                          <div className="h-24 flex items-end gap-1.5 px-2">
                             {[1,1,1,1,1.1,1.2,1.15,1.25,1.3,1.22,1.1].map((scale, i) => (
                               <motion.div 
                                 key={i}
                                 initial={{ height: 0 }}
                                 animate={{ height: `${Math.min(100, (i < 5 ? 100 - i*10 : 60 + i*4) * (scale||1))}%` }}
                                 transition={{ delay: 0.5 + i * 0.05 }}
                                 className={cn(
                                   "flex-1 rounded-t-lg transition-all",
                                   i < 5 ? "bg-gradient-to-t from-primary/40 to-primary" : "bg-gradient-to-t from-accent/40 to-accent"
                                 )}
                               />
                             ))}
                          </div>
                       </div>
                    </div>
                  )}

                  {activeTab === 'hooks' && (
                    <div className="grid grid-cols-1 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                       {result.hookVariations.map((hook: string, i: number) => (
                         <div key={i} className="glass p-5 rounded-2xl group relative hover:border-primary/50 transition-all">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[10px] font-bold text-muted uppercase tracking-widest">Variation {i+1}</span>
                              <button 
                                onClick={() => copyToClipboard(hook)}
                                className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-white/10 rounded-lg"
                              >
                                <Copy className="w-4 h-4 text-muted" />
                              </button>
                            </div>
                            <p className="text-sm leading-relaxed pr-8">{hook}</p>
                         </div>
                       ))}
                    </div>
                  )}

                  {activeTab === 'metadata' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <div className="space-y-4">
                        <h3 className="text-lg font-bold flex items-center"><Target className="w-5 h-5 mr-2 text-primary" /> Target Audience Analysis</h3>
                        <div className="glass p-6 rounded-2xl space-y-4">
                           <div className="flex items-center justify-between border-b border-border pb-4">
                             <span className="text-sm text-muted">Primary Demo</span>
                             <span className="font-bold">{formData.audienceAge.replace('_', ' ')}</span>
                           </div>
                           <div className="flex items-center justify-between border-b border-border pb-4">
                             <span className="text-sm text-muted">Platform Optimization</span>
                             <span className="font-bold">{formData.platform}</span>
                           </div>
                           <div className="flex flex-col space-y-2">
                              <span className="text-sm text-muted">Key Retention Strategies</span>
                              <div className="flex flex-wrap gap-2 pt-1">
                                {Object.values(result.retentionArc).map((val: any, i) => (
                                  <span key={i} className="text-xs bg-white/5 px-3 py-1 rounded-full border border-border">{val}</span>
                                ))}
                              </div>
                           </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-bold flex items-center"><Users className="w-5 h-5 mr-2 text-accent" /> Recommended Titles</h3>
                        <div className="space-y-3">
                           {result.metadata.titles.map((title: string, i: number) => (
                             <div key={i} className="glass p-4 rounded-xl flex items-center justify-between group">
                               <p className="text-sm font-bold">{title}</p>
                               <button onClick={() => copyToClipboard(title)} className="opacity-0 group-hover:opacity-100 transition-opacity p-1">
                                 <Copy className="w-4 h-4" />
                               </button>
                             </div>
                           ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-6 border-t border-border bg-surface/50 flex items-center justify-between">
                   <div className="flex items-center space-x-2 text-xs text-muted">
                      <Clock className="w-4 h-4" />
                      <span>Generated in 4.2s</span>
                   </div>
                   <div className="flex space-x-3">
                      <button className="px-4 py-2 text-sm font-bold rounded-lg border border-border hover:bg-white/5 transition-all">Save to Library</button>
                      <button className="btn-primary py-2 px-6 text-sm">Download (.txt)</button>
                   </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </DashboardLayout>
  );
}

function SectionCard({ title, content, color = "border-l-warning" }: { title: string, content: string, color?: string }) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-bold text-muted uppercase tracking-widest pl-4">{title}</h3>
      <div className={cn("glass p-6 rounded-2xl border-l-4", color)}>
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
      </div>
    </div>
  );
}
