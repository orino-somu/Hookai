// /src/pages/SettingsPage.tsx
import DashboardLayout from '../components/layout/DashboardLayout';
import { User, Shield, CreditCard, Bell, LogOut, ChevronRight } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export default function SettingsPage() {
  const { user } = useAuthStore();

  const sections = [
    { title: 'Profile Information', icon: User, items: ['Update name & photo', 'Email address settings', 'Public bio'] },
    { title: 'Security', icon: Shield, items: ['Change password', 'Two-factor authentication', 'Session management'] },
    { title: 'Plan & Billing', icon: CreditCard, items: ['Manage subscription', 'Payment methods', 'Billing history'], highlight: true },
    { title: 'Notifications', icon: Bell, items: ['Email alerts', 'Product updates', 'Slack integration'] },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted">Manage your account preferences and subscription plans.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {sections.map((section, i) => (
             <div key={i} className="glass p-6 rounded-2xl space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="bg-primary/20 p-2 rounded-lg text-primary">
                    <section.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold">{section.title}</h3>
                </div>
                
                <div className="space-y-2">
                   {section.items.map((item, j) => (
                     <button key={j} className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-all text-sm text-muted hover:text-white group">
                       <span>{item}</span>
                       <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                     </button>
                   ))}
                </div>
                
                {section.highlight && (
                   <div className="bg-linear-to-br from-primary/10 to-accent/10 border border-primary/20 p-4 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold uppercase tracking-widest text-muted">Current Plan</span>
                        <span className="text-xs font-bold bg-primary text-white px-2 py-0.5 rounded">Pro</span>
                      </div>
                      <p className="text-sm font-medium">Billed annually ($29.99/mo)</p>
                   </div>
                )}
             </div>
           ))}
        </div>

        <div className="glass p-6 rounded-2xl border-error/50 bg-error/5">
           <h3 className="text-xl font-bold text-error mb-2">Danger Zone</h3>
           <p className="text-muted text-sm mb-6">Once you delete your account, there is no going back. Please be certain.</p>
           <button className="px-6 py-2 border border-error text-error font-bold rounded-lg hover:bg-error hover:text-white transition-all">
             Delete Account
           </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
