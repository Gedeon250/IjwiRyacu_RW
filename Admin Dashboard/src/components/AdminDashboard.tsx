import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  BarChart2, 
  FileText, 
  Clock, 
  TrendingUp, 
  Map, 
  AlertTriangle,
  CheckCircle,
  Database,
  Award
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/users', label: 'User Management', icon: Users },
    { path: '/analytics', label: 'Analytics Hub', icon: BarChart2 },
    { path: '/reports/issue', label: 'Report Issue', icon: FileText },
    { path: '/reports/queue', label: 'Report Queue', icon: Clock },
    { path: '/reports/track', label: 'Track Reports', icon: CheckCircle },
    { path: '/trending', label: 'Trending Issues', icon: TrendingUp },
    { path: '/district-comparison', label: 'District Comparison', icon: Map },
    { path: '/team-performance', label: 'Team Performance', icon: Users },
    { path: '/map', label: 'Map View', icon: Map },
    { path: '/alerts', label: 'Priority Alerts', icon: AlertTriangle },
    { path: '/accountability', label: 'Data Accountability', icon: Database },
    { path: '/success-stories', label: 'Success Stories', icon: Award },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800">Ijwi Ryacu</h1>
          <p className="text-sm text-gray-600">Admin Dashboard</p>
        </div>
        <nav className="mt-4">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center px-4 py-3 text-sm ${
                  isActive 
                    ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};