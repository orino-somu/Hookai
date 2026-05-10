// /src/pages/LandingPage.tsx
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { PenTool, Hash, Zap, Users, BarChart3, Globe, Shield, ArrowRight, Sparkles, Star, PlayCircle } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden selection:bg-primary/30">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[140px] -z-10 animate-pulse" />
      <div className="absolute top-[20%] right-[-5%] w-[500px] h-[500px] bg-accent/10 rounded-full blur-[140px] -z-10" />
      <div className="absolute bottom-[-10%] left-[20%] w-[700px] h-[700px] bg-primary/10 rounded-full blur-[140px] -z-10 animate-pulse" />

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto border-b border-border/30 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
            <Sparkles className="text-white w-5 h-5" />
          </div>
          <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            HookMind
          </span>
        </div>
        <div className="hidden md:flex items-center space-x-10 text-sm font-bold uppercase tracking-widest text-muted">
          <a href="#features" className="hover:text-primary transition-colors">Platform</a>
          <a href="#pricing" className="hover:text-primary transition-colors">Pricing</a>
          <a href="#docs" className="hover:text-primary transition-colors">Docs</a>
        </div>
        <div className="flex items-center space-x-6">
          <Link to="/login" className="text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors">Sign In</Link>
          <Link to="/register" className="btn-primary text-xs tracking-widest uppercase py-3 shadow-primary/40">
            Start Studio
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-32 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-3 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-10 backdrop-blur-sm"
          >
            <div className="flex -space-x-2">
              {[1,2,3].map(i => (
                <div key={i} className="w-5 h-5 rounded-full bg-gradient-to-tr from-primary to-accent border-2 border-background" />
              ))}
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Joined by 12k+ Viral Creators</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-extrabold mb-8 leading-[1] tracking-tighter"
          >
            SCRIPTING <br /> 
            <span className="bg-gradient-to-r from-primary via-accent to-primary animate-gradient-x bg-clip-text text-transparent">AT LIGHTSPEED</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-muted max-w-3xl mx-auto mb-14 leading-relaxed font-medium"
          >
            HookMind AI translates your abstract ideas into high-retention video architectures. 
            Scroll-stopping hooks, psychological beats, and viral conclusions generated in 400ms.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link to="/register" className="btn-primary text-lg px-10 py-5 w-full sm:w-auto shadow-2xl shadow-primary/30">
              Get Unlimited Access
            </Link>
            <button className="flex items-center gap-3 px-10 py-5 rounded-xl border border-border hover:bg-white/5 transition-all w-full sm:w-auto font-bold uppercase tracking-widest text-sm">
              <PlayCircle className="w-5 h-5 text-primary" />
              Watch Engine Demo
            </button>
          </motion.div>

          {/* Interface Teaser */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: "circOut" }}
            className="mt-32 p-4 bg-gradient-to-b from-white/10 to-transparent rounded-[3rem] border border-white/10 max-w-6xl mx-auto relative group overflow-hidden"
          >
             <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity blur-[100px] pointer-events-none" />
             <div className="bg-surface rounded-[2.2rem] border border-border/50 h-[600px] overflow-hidden relative shadow-2xl">
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/60 to-background z-20 pointer-events-none" />
                
                {/* Mockup Content */}
                <div className="p-8 h-full bg-[#0d0d12]">
                   <div className="flex items-center justify-between border-b border-border/30 pb-6 mb-8">
                     <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-error/50" />
                        <div className="w-3 h-3 rounded-full bg-warning/50" />
                        <div className="w-3 h-3 rounded-full bg-success/50" />
                     </div>
                     <div className="px-3 py-1.5 bg-card border border-border rounded-lg text-[10px] text-muted font-bold tracking-widest uppercase">
                       Studio Environment v4.2
                     </div>
                   </div>
                   <div className="grid grid-cols-12 gap-6 h-full">
                      <div className="col-span-3 space-y-4">
                         {[1,2,3,4,5].map(i => (
                           <div key={i} className="h-10 bg-white/5 rounded-lg border border-white/5" />
                         ))}
                      </div>
                      <div className="col-span-9 space-y-6">
                         <div className="h-12 bg-primary/10 rounded-xl border border-primary/20 w-3/4" />
                         <div className="h-40 bg-white/5 rounded-2xl border border-white/5" />
                         <div className="grid grid-cols-2 gap-6">
                            <div className="h-64 bg-accent/5 rounded-2xl border border-accent/10" />
                            <div className="h-64 bg-white/5 rounded-2xl border border-white/5" />
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* Features - Bento Grid Style */}
      <section id="features" className="py-40 px-6 bg-surface/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
             <div className="max-w-2xl">
               <h2 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight">THE VIRAL STACK</h2>
               <p className="text-xl text-muted font-medium">Tools built strictly for the attention economy.</p>
             </div>
             <div className="flex gap-4">
               <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20">
                  <Star className="w-8 h-8 text-primary" />
               </div>
               <div className="p-4 bg-accent/10 rounded-2xl border border-accent/20">
                  <Zap className="w-8 h-8 text-accent" />
               </div>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-full md:h-[800px]">
             {/* Feature 1: Large */}
             <div className="md:col-span-2 md:row-span-2 glass rounded-[2.5rem] p-10 flex flex-col justify-between group overflow-hidden">
                <div className="relative">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-10 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    <PenTool className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4 tracking-tight">Script Studio™ Engine</h3>
                  <p className="text-lg text-muted font-medium mb-8 max-w-sm">Our primary engine generates full-length video architectures with retention markers, B-roll cues, and psychological triggers.</p>
                </div>
                <div className="relative mt-8">
                   <div className="absolute inset-0 bg-linear-to-r from-primary to-accent opacity-20 blur-[50px]" />
                   <div className="relative bg-black/40 rounded-2xl p-6 border border-white/10 space-y-4">
                      <div className="h-2 w-3/4 bg-white/20 rounded" />
                      <div className="h-2 w-full bg-white/10 rounded" />
                      <div className="h-2 w-1/2 bg-white/10 rounded" />
                   </div>
                </div>
             </div>

             {/* Feature 2: Wide */}
             <div className="md:col-span-2 glass rounded-[2.5rem] p-10 flex items-center gap-10 group hover:border-accent shadow-accent/5 shadow-2xl">
                <div className="w-1/2">
                   <h3 className="text-2xl font-bold mb-4 tracking-tight">Hook Generator DNA</h3>
                   <p className="text-muted font-medium">Instantly generate 15+ scroll-stopping hooks based on 10 recurring viral patterns.</p>
                </div>
                <div className="w-1/2 grid grid-cols-2 gap-2">
                   {[1,2,3,4].map(i => (
                     <div key={i} className="h-12 bg-accent/10 rounded-lg border border-accent/20 group-hover:scale-105 transition-transform" />
                   ))}
                </div>
             </div>

             {/* Feature 3: Normal */}
             <div className="glass rounded-[2.5rem] p-10 group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[60px]" />
                <BarChart3 className="w-10 h-10 text-primary mb-6" />
                <h3 className="text-xl font-bold mb-4 tracking-tight">Retention IQ</h3>
                <p className="text-muted font-medium text-sm leading-relaxed">AI predicts your retention drop-offs before you even start filming.</p>
             </div>

             {/* Feature 4: Normal */}
             <div className="glass rounded-[2.5rem] p-10 group bg-linear-to-br from-accent/10 to-transparent">
                <Globe className="w-10 h-10 text-accent mb-6" />
                <h3 className="text-xl font-bold mb-4 tracking-tight">Platform Sync</h3>
                <p className="text-muted font-medium text-sm leading-relaxed">Direct export formats for YouTube, TikTok, Reels, and X (Twitter) Shorts.</p>
             </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 px-6 text-center">
         <div className="max-w-4xl mx-auto glass p-16 rounded-[4rem] border-primary/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary" />
            <Sparkles className="w-16 h-16 text-primary mx-auto mb-8 animate-pulse" />
            <h2 className="text-4xl md:text-6xl font-extrabold mb-8 tracking-tighter leading-tight">READY TO GO <br /> VIRAL ON REPEAT?</h2>
            <p className="text-xl text-muted font-medium mb-12 max-w-2xl mx-auto">Join the next wave of elite content creators using HookMind to dominate their niche.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="btn-primary text-xl px-12 py-5 shadow-2xl shadow-primary/30">Get Started Free</Link>
              <Link to="/pricing" className="px-12 py-5 rounded-xl border border-border hover:bg-white/5 transition-all font-bold uppercase tracking-widest text-sm">View Full PRICING</Link>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-8 border-t border-border/30 bg-surface/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-primary to-accent rounded flex items-center justify-center">
              <Sparkles className="text-white w-4 h-4" />
            </div>
            <span className="text-lg font-bold tracking-tight">HookMind AI</span>
          </div>
          <div className="flex gap-10 text-xs font-bold uppercase tracking-widest text-muted">
             <a href="#" className="hover:text-primary transition-colors">Privacy</a>
             <a href="#" className="hover:text-primary transition-colors">Twitter</a>
             <a href="#" className="hover:text-primary transition-colors">Terms</a>
             <a href="#" className="hover:text-primary transition-colors">Contact</a>
          </div>
          <p className="text-xs text-muted font-medium opacity-50">© 2024 HookMind Studio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
