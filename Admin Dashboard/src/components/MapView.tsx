import React from 'react';
import { MapPin, Eye, Clock, CheckCircle } from 'lucide-react';

interface MapViewProps {
  language: 'en' | 'rw';
}

export const MapView: React.FC<MapViewProps> = ({ language }) => {
  const translations = {
    en: {
      title: 'Issue Distribution Map',
      urgent: 'Urgent',
      pending: 'Pending', 
      resolved: 'Resolved',
      viewDetails: 'View Details',
      districts: {
        kigali: 'Kigali City',
        northern: 'Northern Province',
        southern: 'Southern Province',
        eastern: 'Eastern Province',
        western: 'Western Province'
      }
    },
    rw: {
      title: 'Ikarita y\'Ibibazo',
      urgent: 'Byihutirwa',
      pending: 'Bitegereje',
      resolved: 'Byakemuwe',
      viewDetails: 'Reba Amakuru Arambuye',
      districts: {
        kigali: 'Umujyi wa Kigali',
        northern: 'Intara y\'Amajyaruguru',
        southern: 'Intara y\'Amajyepfo',
        eastern: 'Intara y\'Iburasirazuba',
        western: 'Intara y\'Iburengerazuba'
      }
    }
  };

  const t = translations[language];

  const mockReports = [
    { id: 1, district: 'Kigali', type: 'urgent', issue: 'Water shortage', x: 45, y: 30 },
    { id: 2, district: 'Musanze', type: 'pending', issue: 'Road repair needed', x: 35, y: 15 },
    { id: 3, district: 'Huye', type: 'resolved', issue: 'School supplies delivered', x: 40, y: 70 },
    { id: 4, district: 'Rubavu', type: 'pending', issue: 'Health center understaffed', x: 15, y: 25 },
    { id: 5, district: 'Nyagatare', type: 'urgent', issue: 'Bridge maintenance', x: 75, y: 20 },
    { id: 6, district: 'Kamonyi', type: 'resolved', issue: 'Solar panels installed', x: 50, y: 50 }
  ];

  const getMarkerColor = (type: string) => {
    switch (type) {
      case 'urgent': return 'bg-red-500';
      case 'pending': return 'bg-yellow-500';
      case 'resolved': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getMarkerIcon = (type: string) => {
    switch (type) {
      case 'urgent': return Clock;
      case 'pending': return Eye;
      case 'resolved': return CheckCircle;
      default: return MapPin;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">{t.title}</h3>
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>{t.urgent}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span>{t.pending}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>{t.resolved}</span>
          </div>
        </div>
      </div>

      <div className="relative bg-gradient-to-br from-green-100 to-blue-100 rounded-lg h-96 overflow-hidden">
        {/* Simplified Rwanda map background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-200 to-blue-200 opacity-50"></div>
        
        {/* Province outlines (simplified) */}
        <div className="absolute inset-4 border-2 border-green-300 rounded-lg opacity-30"></div>
        
        {/* Report markers */}
        {mockReports.map((report) => {
          const Icon = getMarkerIcon(report.type);
          return (
            <div
              key={report.id}
              className="absolute group cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${report.x}%`, top: `${report.y}%` }}
            >
              <div className={`w-6 h-6 ${getMarkerColor(report.type)} rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform`}>
                <Icon className="w-3 h-3 text-white" />
              </div>
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                <div className="font-semibold">{report.district}</div>
                <div>{report.issue}</div>
                <button className="text-blue-300 hover:text-blue-200 mt-1">
                  {t.viewDetails}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};