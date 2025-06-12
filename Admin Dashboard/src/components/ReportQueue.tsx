import React, { useState } from 'react';
import { 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  ChevronDown, 
  ChevronUp,
  Phone,
  UserPlus,
  MessageSquare,
  Filter,
  Search
} from 'lucide-react';
import { ReportModals } from './ReportModals';

interface ReportQueueProps {
  language: 'en' | 'rw';
}

interface Report {
  id: number;
  title: string;
  status: 'urgent' | 'pending' | 'resolved';
  district: string;
  category: string;
  reporter: string;
  assignedTo: string | null;
  daysOpen: number;
  lastUpdated: string;
  notes: string[];
}

export const ReportQueue: React.FC<ReportQueueProps> = ({ language }) => {
  const [sortField, setSortField] = useState<keyof Report>('daysOpen');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<Report['status'] | 'all'>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [activeModal, setActiveModal] = useState<{
    type: 'notes' | 'assignment';
    report: Report;
  } | null>(null);

  const translations = {
    en: {
      title: 'Report Queue',
      search: 'Search reports...',
      filters: 'Filters',
      status: 'Status',
      category: 'Category',
      district: 'District',
      reporter: 'Reporter',
      assignedTo: 'Assigned To',
      daysOpen: 'Days Open',
      lastUpdated: 'Last Updated',
      urgent: 'Urgent',
      pending: 'Pending',
      resolved: 'Resolved',
      all: 'All',
      assignOfficer: 'Assign Officer',
      callReporter: 'Call Reporter',
      addNote: 'Add Note',
      sortBy: 'Sort by',
      noReports: 'No reports found',
      actions: 'Actions',
      categories: {
        infrastructure: 'Infrastructure',
        health: 'Health',
        education: 'Education',
        security: 'Security',
        other: 'Other'
      }
    },
    rw: {
      title: 'Urutonde rwa Raporo',
      search: 'Shakisha raporo...',
      filters: 'Imyitozo',
      status: 'Imiterere',
      category: 'Ubwoko',
      district: 'Akarere',
      reporter: 'Ushinzwe',
      assignedTo: 'Yahariwe',
      daysOpen: 'Iminsi Zikora',
      lastUpdated: 'Byasubirwaho',
      urgent: 'Byihutirwa',
      pending: 'Bitegereje',
      resolved: 'Byakemuwe',
      all: 'Yose',
      assignOfficer: 'Tanga Umukozi',
      callReporter: 'Hamagara Ushinzwe',
      addNote: 'Bika Inyandiko',
      sortBy: 'Gutondeka',
      noReports: 'Nta raporo zisanzwe',
      actions: 'Ibikorwa',
      categories: {
        infrastructure: 'Ubwubatsi',
        health: 'Ubuzima',
        education: 'Amashuri',
        security: 'Umutekano',
        other: 'Ibindi'
      }
    }
  };

  const t = translations[language];

  const mockReports: Report[] = [
    {
      id: 1,
      title: 'Water shortage in Kigali sector',
      status: 'urgent',
      district: 'Kigali',
      category: 'infrastructure',
      reporter: '+250 788 123 456',
      assignedTo: 'John Doe',
      daysOpen: 2,
      lastUpdated: '2024-02-20 14:30',
      notes: ['Initial report received', 'Water tanker dispatched']
    },
    {
      id: 2,
      title: 'School supplies needed',
      status: 'pending',
      district: 'Musanze',
      category: 'education',
      reporter: '+250 789 123 456',
      assignedTo: null,
      daysOpen: 3,
      lastUpdated: '2024-02-19 09:15',
      notes: ['Awaiting budget approval']
    },
    {
      id: 3,
      title: 'Health center understaffed',
      status: 'resolved',
      district: 'Huye',
      category: 'health',
      reporter: '+250 787 123 456',
      assignedTo: 'Jane Smith',
      daysOpen: 0,
      lastUpdated: '2024-02-20 16:45',
      notes: ['Additional staff assigned', 'Issue resolved']
    }
  ];

  const handleSort = (field: keyof Report) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const getStatusColor = (status: Report['status']) => {
    switch (status) {
      case 'urgent': return 'bg-red-100 text-red-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'resolved': return 'bg-green-100 text-green-700';
    }
  };

  const getStatusIcon = (status: Report['status']) => {
    switch (status) {
      case 'urgent': return AlertTriangle;
      case 'pending': return Clock;
      case 'resolved': return CheckCircle;
    }
  };

  const filteredReports = mockReports
    .filter(report => {
      const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          report.district.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      const direction = sortDirection === 'asc' ? 1 : -1;
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return direction * aValue.localeCompare(bValue);
      }
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return direction * (aValue - bValue);
      }
      return 0;
    });

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{t.title}</h2>
        <p className="text-gray-600">Manage and track community issue reports</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">{t.title}</h3>
          
          <div className="flex gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder={t.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span>{t.filters}</span>
            </button>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.status}</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as Report['status'] | 'all')}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">{t.all}</option>
                  <option value="urgent">{t.urgent}</option>
                  <option value="pending">{t.pending}</option>
                  <option value="resolved">{t.resolved}</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Reports Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 font-medium text-gray-600">Report ID</th>
                <th className="text-left p-3 font-medium text-gray-600">Type</th>
                <th className="text-left p-3 font-medium text-gray-600">Location</th>
                <th className="text-left p-3 font-medium text-gray-600">Status</th>
                <th className="text-left p-3 font-medium text-gray-600">Priority</th>
                <th className="text-left p-3 font-medium text-gray-600">Assigned To</th>
                <th className="text-left p-3 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((report) => (
                <tr key={report.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-3 font-medium text-blue-600">{report.id}</td>
                  <td className="p-3">{t.categories[report.category as keyof typeof t.categories]}</td>
                  <td className="p-3">{report.district}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(report.status)}`}>
                      {t[report.status]}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-1">
                      {(() => {
                        const Icon = getStatusIcon(report.status);
                        return <Icon className="w-4 h-4" />;
                      })()}
                    </div>
                  </td>
                  <td className="p-3">{report.assignedTo || 'Unassigned'}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setActiveModal({ type: 'assignment', report })}
                        className="text-blue-600 hover:text-blue-800 text-xs px-2 py-1 bg-blue-100 rounded"
                        title={t.assignOfficer}
                      >
                        <UserPlus className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setActiveModal({ type: 'notes', report })}
                        className="text-gray-600 hover:text-gray-800 text-xs px-2 py-1 bg-gray-100 rounded"
                        title={t.addNote}
                      >
                        <MessageSquare className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredReports.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          {t.noReports}
        </div>
      )}

      {/* Modals */}
      {activeModal && (
        <ReportModals
          language={language}
          isOpen={true}
          onClose={() => setActiveModal(null)}
          type={activeModal.type}
          reportId={activeModal.report.id}
          reportTitle={activeModal.report.title}
          currentAssignee={activeModal.report.assignedTo}
          currentNotes={activeModal.report.notes}
        />
      )}
    </div>
  );
};
