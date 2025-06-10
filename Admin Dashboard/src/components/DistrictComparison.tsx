import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  MapPin
} from 'lucide-react';

interface DistrictComparisonProps {
  language: 'en' | 'rw';
}

interface DistrictMetric {
  id: number;
  name: string;
  totalReports: number;
  resolvedReports: number;
  avgResponseTime: number;
  satisfactionRating: number;
  urgentReports: number;
  trend: 'up' | 'down' | 'stable';
}

export const DistrictComparison: React.FC<DistrictComparisonProps> = ({ language }) => {
  const [sortField, setSortField] = useState<keyof DistrictMetric>('totalReports');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedMetric, setSelectedMetric] = useState<keyof DistrictMetric>('totalReports');

  const translations = {
    en: {
      title: 'District Performance Comparison',
      subtitle: 'Compare metrics across districts',
      totalReports: 'Total Reports',
      resolvedReports: 'Resolved Reports',
      avgResponseTime: 'Avg. Response Time',
      satisfactionRating: 'Satisfaction Rating',
      urgentReports: 'Urgent Reports',
      resolutionRate: 'Resolution Rate',
      sortBy: 'Sort by',
      trend: {
        up: 'Improving',
        down: 'Declining',
        stable: 'Stable'
      },
      timeFrame: 'Last 30 days',
      selectMetric: 'Select Metric to Compare'
    },
    rw: {
      title: 'Gutondeka Imikorere y\'Akarere',
      subtitle: 'Gereranya imikorere mu turere',
      totalReports: 'Raporo Zose',
      resolvedReports: 'Raporo Zakemuwe',
      avgResponseTime: 'Igihe cy\'Igisubizo',
      satisfactionRating: 'Ishimwe',
      urgentReports: 'Raporo Zihutirwa',
      resolutionRate: 'Umubare w\'Ibisubizo',
      sortBy: 'Gutondeka',
      trend: {
        up: 'Byongeye',
        down: 'Byakabanuka',
        stable: 'Byakomeje'
      },
      timeFrame: 'Iminsi 30 ishize',
      selectMetric: 'Hitamo Imikorere yo Kugereranya'
    }
  };

  const t = translations[language];

  const mockDistricts: DistrictMetric[] = [
    {
      id: 1,
      name: 'Kigali',
      totalReports: 245,
      resolvedReports: 198,
      avgResponseTime: 2.1,
      satisfactionRating: 4.7,
      urgentReports: 15,
      trend: 'up'
    },
    {
      id: 2,
      name: 'Musanze',
      totalReports: 178,
      resolvedReports: 145,
      avgResponseTime: 2.8,
      satisfactionRating: 4.5,
      urgentReports: 12,
      trend: 'stable'
    },
    {
      id: 3,
      name: 'Huye',
      totalReports: 156,
      resolvedReports: 120,
      avgResponseTime: 3.2,
      satisfactionRating: 4.2,
      urgentReports: 18,
      trend: 'down'
    },
    {
      id: 4,
      name: 'Rubavu',
      totalReports: 132,
      resolvedReports: 98,
      avgResponseTime: 2.9,
      satisfactionRating: 4.4,
      urgentReports: 10,
      trend: 'up'
    }
  ];

  const handleSort = (field: keyof DistrictMetric) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const getTrendColor = (trend: DistrictMetric['trend']) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      case 'stable': return 'text-yellow-600';
    }
  };

  const getTrendIcon = (trend: DistrictMetric['trend']) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4" />;
      case 'down': return <TrendingUp className="w-4 h-4 transform rotate-180" />;
      case 'stable': return <BarChart3 className="w-4 h-4" />;
    }
  };

  const sortedDistricts = [...mockDistricts].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    const direction = sortDirection === 'asc' ? 1 : -1;
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return direction * (aValue - bValue);
    }
    return 0;
  });

  const getMetricColor = (metric: keyof DistrictMetric, value: number) => {
    switch (metric) {
      case 'satisfactionRating':
        return value >= 4.5 ? 'text-green-600' : value >= 4.0 ? 'text-yellow-600' : 'text-red-600';
      case 'avgResponseTime':
        return value <= 2.5 ? 'text-green-600' : value <= 3.0 ? 'text-yellow-600' : 'text-red-600';
      default:
        return 'text-gray-900';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{t.title}</h3>
          <p className="text-sm text-gray-600">{t.subtitle}</p>
        </div>
        <MapPin className="w-6 h-6 text-gray-400" />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t.selectMetric}
        </label>
        <select
          value={selectedMetric}
          onChange={(e) => setSelectedMetric(e.target.value as keyof DistrictMetric)}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="totalReports">{t.totalReports}</option>
          <option value="resolvedReports">{t.resolvedReports}</option>
          <option value="avgResponseTime">{t.avgResponseTime}</option>
          <option value="satisfactionRating">{t.satisfactionRating}</option>
          <option value="urgentReports">{t.urgentReports}</option>
        </select>
      </div>

      <div className="space-y-4">
        {sortedDistricts.map((district) => (
          <div key={district.id} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <h4 className="font-medium text-gray-900">{district.name}</h4>
                <span className={`flex items-center space-x-1 text-sm ${getTrendColor(district.trend)}`}>
                  {getTrendIcon(district.trend)}
                  <span>{t.trend[district.trend]}</span>
                </span>
              </div>
              <div className="text-sm text-gray-500">{t.timeFrame}</div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-600">{t.totalReports}</p>
                <p className="font-medium text-gray-900">{district.totalReports}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">{t.resolvedReports}</p>
                <p className="font-medium text-gray-900">
                  {district.resolvedReports}
                  <span className="text-sm text-gray-500 ml-1">
                    ({Math.round((district.resolvedReports / district.totalReports) * 100)}%)
                  </span>
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">{t.avgResponseTime}</p>
                <p className={`font-medium ${getMetricColor('avgResponseTime', district.avgResponseTime)}`}>
                  {district.avgResponseTime}h
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">{t.satisfactionRating}</p>
                <p className={`font-medium ${getMetricColor('satisfactionRating', district.satisfactionRating)}`}>
                  {district.satisfactionRating}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">{t.urgentReports}</span>
                <span className="font-medium text-red-600">{district.urgentReports}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div 
                  className="bg-red-500 h-2 rounded-full" 
                  style={{ width: `${(district.urgentReports / district.totalReports) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 