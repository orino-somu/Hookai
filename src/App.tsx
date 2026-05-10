// /src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuthStore } from './store/authStore';

// Layouts
import AdminLayout from './components/layout/AdminLayout';

// Main App Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ScriptStudioPage from './pages/ScriptStudioPage';
import HookGeneratorPage from './pages/HookGeneratorPage';
import LibraryPage from './pages/LibraryPage';
import SettingsPage from './pages/SettingsPage';

// Admin Panel Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import AiStatsPage from './pages/admin/AiStatsPage';
import ScriptsManagement from './pages/admin/ScriptsManagement';
import AuditLogsPage from './pages/admin/AuditLogsPage';

const queryClient = new QueryClient();

function ProtectedRoute({ children, adminOnly = false }: { children: React.ReactNode, adminOnly?: boolean }) {
  const { user, token } = useAuthStore();
  
  if (!token) return <Navigate to="/login" />;
  if (adminOnly && user?.role !== 'ADMIN') return <Navigate to="/dashboard" />;
  
  return children;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* User Protected Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/script-studio" element={<ProtectedRoute><ScriptStudioPage /></ProtectedRoute>} />
          <Route path="/hook-generator" element={<ProtectedRoute><HookGeneratorPage /></ProtectedRoute>} />
          <Route path="/library" element={<ProtectedRoute><LibraryPage /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />

          {/* Admin Panel Routes (Nested) */}
          <Route path="/admin-panel" element={<ProtectedRoute adminOnly><AdminLayout><AdminDashboard /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin-panel/users" element={<ProtectedRoute adminOnly><AdminLayout><UserManagement /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin-panel/ai-stats" element={<ProtectedRoute adminOnly><AdminLayout><AiStatsPage /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin-panel/scripts" element={<ProtectedRoute adminOnly><AdminLayout><ScriptsManagement /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin-panel/audit" element={<ProtectedRoute adminOnly><AdminLayout><AuditLogsPage /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin-panel/*" element={<ProtectedRoute adminOnly><AdminLayout><AdminDashboard /></AdminLayout></ProtectedRoute>} />
          
          <Route path="/admin" element={<Navigate to="/admin-panel" replace />} />
        </Routes>
        <Toaster theme="dark" closeButton richColors />
      </Router>
    </QueryClientProvider>
  );
}
