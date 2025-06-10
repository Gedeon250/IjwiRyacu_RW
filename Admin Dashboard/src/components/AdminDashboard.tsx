import React, { useState } from 'react';
import { AlertTriangle, Users, Settings, FileText, Clock, CheckCircle, Filter, UserPlus } from 'lucide-react';

interface AdminDashboardProps {
  language: 'en' | 'rw';
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ language }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedReport, setSelectedReport] = useState<any>(null);

  const translations = {
    en: {
      title: 'Admin Dashboard',
      subtitle: 'Manage reports, assignments, and system oversight',
      priorityAlerts: 'Priority Alerts',
      reportManagement: 'Report Management',
      analytics: 'Analytics & Trends',
      userManagement: 'User Management',
      urgent: 'Urgent',
      pending: 'Pending',
      resolved: 'Resolved',
      all: 'All Reports',
      assign: 'Assign',
      markResolved: 'Mark Resolved',
      addNote: 'Add Note',
      filters: {
        all: 'All',
        urgent: 'Urgent',
        pending: 'Pending',
        resolved: 'Resolved'
      }
    },
    rw: {
      title: 'Ikiyobozi cy\'Ubuyobozi',
      subtitle: 'Gucunga raporo, gutanga inshingano, n\'igenzura rya sisitemu',
      priorityAlerts: 'Ibimenyetso Bikomeye',
      reportManagement: 'Gucunga Raporo',
      analytics: 'Isesengura n\'Imibereho',
      userManagement: 'Gucunga Abakoresha',
      urgent: 'Byihutirwa',
      pending: 'Bitegereje',
      resolved: 'Byakemuwe',
      all: 'Raporo Zose',
      assign: 'Gutanga',
      markResolved: 'Gushyira Nka Byakemuwe',
      addNote: 'Ongeraho Icyandiko',
      filters: {
        all: 'Byose',
        urgent: 'Byihutirwa',
        pending: 'Bitegereje',
        resolved: 'Byakemuwe'
      }
    }
  };

  const t = translations[language];

  const urgentAlerts = [
    {
      id: 1,
      type: 'Health Emergency',
      location: 'Gasabo District',
      description: 'Medical supplies shortage reported at health center',
      priority: 'critical',
      reportedTime: '2 hours ago',
      unreadCount: 3
    },
    {
      id: 2,
      type: 'Infrastructure',
      location: 'Nyanza District',
      description: 'Bridge collapse blocking main road access',
      priority: 'high',
      reportedTime: '4 hours ago',
      unreadCount: 5
    },
    {
      id: 3,
      type: 'Water Crisis',
      location: 'Karongi District',
      description: 'Water pump failure affecting 500+ families',
      priority: 'high',
      reportedTime: '6 hours ago',
      unreadCount: 8
    }
  ];

  const mockReports = [
    {
      id: 'RPT-2024-003',
      type: 'Water Access',
      description: 'Community well needs repair',
      location: 'Muhanga District',
      status: 'urgent',
      submittedDate: '2024-01-19',
      assignedTo: null,
      submittedBy: 'Anonymous'
    },
    {
      id: 'RPT-2024-004',
      type: 'Road Repair',
      description: 'Potholes on main market road',
      location: 'Huye District',
      status: 'pending',
      submittedDate: '2024-01-18',
      assignedTo: 'Road Maintenance Team',
      submittedBy: '+250788123456'
    },
    {
      id: 'RPT-2024-005',
      type: 'Education',
      description: 'School lacks basic supplies',
      location: 'Kayonza District',
      status: 'resolved',
      submittedDate: '2024-01-15',
      assignedTo: 'Education Department',
      submittedBy: 'School Committee'
    }
  ];

  const filteredReports = selectedFilter === 'all' 
    ? mockReports 
    : mockReports.filter(report => report.status === selectedFilter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'urgent': return 'text-red-600 bg-red-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'resolved': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'border-l-red-500 bg-red-50';
      case 'high': return 'border-l-orange-500 bg-orange-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{t.title}</h2>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      {/* Priority Alerts */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-2 mb-6">
          <AlertTriangle className="w-5 h-5 text-red-600" />
          <h3 className="text-xl font-bold text-gray-800">{t.priorityAlerts}</h3>
          <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
            {urgentAlerts.length} Active
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {urgentAlerts.map((alert) => (
            <div key={alert.id} className={`border-l-4 p-4 rounded-lg ${getPriorityColor(alert.priority)}`}>
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-gray-800">{alert.type}</h4>
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {alert.unreadCount}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{alert.description}</p>
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>{alert.location}</span>
                <span>{alert.reportedTime}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Report Management */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <h3 className="text-xl font-bold text-gray-800">{t.reportManagement}</h3>
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {Object.entries(t.filters).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 font-medium text-gray-600">Report ID</th>
                <th className="text-left p-3 font-medium text-gray-600">Type</th>
                <th className="text-left p-3 font-medium text-gray-600">Location</th>
                <th className="text-left p-3 font-medium text-gray-600">Status</th>
                <th className="text-left p-3 font-medium text-gray-600">Assigned To</th>
                <th className="text-left p-3 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((report) => (
                <tr key={report.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-3 font-medium text-blue-600">{report.id}</td>
                  <td className="p-3">{report.type}</td>
                  <td className="p-3">{report.location}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(report.status)}`}>
                      {t[report.status as keyof typeof t] || report.status}
                    </span>
                  </td>
                  <td className="p-3">{report.assignedTo || 'Unassigned'}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      {!report.assignedTo && (
                        <button className="text-blue-600 hover:text-blue-800 text-xs px-2 py-1 bg-blue-100 rounded">
                          {t.assign}
                        </button>
                      )}
                      {report.status !== 'resolved' && (
                        <button className="text-green-600 hover:text-green-800 text-xs px-2 py-1 bg-green-100 rounded">
                          {t.markResolved}
                        </button>
                      )}
                      <button className="text-gray-600 hover:text-gray-800 text-xs px-2 py-1 bg-gray-100 rounded">
                        {t.addNote}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="flex items-center justify-center mb-3">
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-gray-800 mb-1">24</div>
          <div className="text-gray-600 text-sm">New Reports Today</div>
          <div className="text-green-600 text-xs mt-1">+12% from yesterday</div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="flex items-center justify-center mb-3">
            <Clock className="w-8 h-8 text-orange-600" />
          </div>
          <div className="text-2xl font-bold text-gray-800 mb-1">156</div>
          <div className="text-gray-600 text-sm">Pending Reviews</div>
          <div className="text-orange-600 text-xs mt-1">Needs attention</div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="flex items-center justify-center mb-3">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-gray-800 mb-1">89</div>
          <div className="text-gray-600 text-sm">Resolved This Week</div>
          <div className="text-green-600 text-xs mt-1">+8% improvement</div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="flex items-center justify-center mb-3">
            <Users className="w-8 h-8 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-gray-800 mb-1">12</div>
          <div className="text-gray-600 text-sm">Active Staff</div>
          <div className="text-purple-600 text-xs mt-1">All districts covered</div>
        </div>
      </div>
    </div>
  );
};