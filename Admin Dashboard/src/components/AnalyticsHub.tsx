import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { 
  TrendingUp, 
  Calendar, 
  Filter,
  Download,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface AnalyticsHubProps {
  language: 'en' | 'rw';
}

export const AnalyticsHub: React.FC<AnalyticsHubProps> = ({ language }) => {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');
  const [showFilters, setShowFilters] = useState(false);

  const translations = {
    en: {
      title: 'Analytics Hub',
      subtitle: 'Comprehensive performance metrics and trends',
      timeRange: {
        week: 'Last Week',
        month: 'Last Month',
        year: 'Last Year'
      },
      metrics: {
        totalReports: 'Total Reports',
        resolutionRate: 'Resolution Rate',
        avgResponseTime: 'Avg. Response Time',
        satisfactionRating: 'Satisfaction Rating'
      },
      categories: {
        infrastructure: 'Infrastructure',
        health: 'Health',
        education: 'Education',
        security: 'Security',
        other: 'Other'
      },
      trends: {
        reports: 'Report Trends',
        categories: 'Category Distribution',
        response: 'Response Time Trends'
      },
      filters: 'Filters',
      export: 'Export Data'
    },
    rw: {
      title: 'Ikiyobozi cy\'Imibare',
      subtitle: 'Imibare n\'imikorere yose',
      timeRange: {
        week: 'Icyumweru Gishize',
        month: 'Ukwezi Gushize',
        year: 'Umwaka Ushize'
      },
      metrics: {
        totalReports: 'Raporo Zose',
        resolutionRate: 'Umubare w\'Ibisubizo',
        avgResponseTime: 'Igihe cy\'Igisubizo',
        satisfactionRating: 'Ishimwe'
      },
      categories: {
        infrastructure: 'Ubwubatsi',
        health: 'Ubuzima',
        education: 'Amashuri',
        security: 'Umutekano',
        other: 'Ibindi'
      },
      trends: {
        reports: 'Imikorere y\'Raporo',
        categories: 'Ubwoko bw\'Raporo',
        response: 'Imikorere y\'Ibisubizo'
      },
      filters: 'Imyitozo',
      export: 'Koporora Amakuru'
    }
  };

  const t = translations[language];

  // Mock data for charts
  const reportTrendsData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: t.metrics.totalReports,
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: true,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4
      }
    ]
  };

  const categoryDistributionData = {
    labels: [
      t.categories.infrastructure,
      t.categories.health,
      t.categories.education,
      t.categories.security,
      t.categories.other
    ],
    datasets: [
      {
        data: [30, 25, 20, 15, 10],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(139, 92, 246, 0.8)'
        ]
      }
    ]
  };

  const responseTimeData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: t.metrics.avgResponseTime,
        data: [2.1, 2.3, 1.9, 2.2, 2.0, 2.4, 2.1],
        backgroundColor: 'rgba(16, 185, 129, 0.8)'
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const
      }
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{t.title}</h3>
          <p className="text-sm text-gray-600">{t.subtitle}</p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <Filter className="w-4 h-4" />
            <span>{t.filters}</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors">
            <Download className="w-4 h-4" />
            <span>{t.export}</span>
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value as 'week' | 'month' | 'year')}
                className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="week">{t.timeRange.week}</option>
                <option value="month">{t.timeRange.month}</option>
                <option value="year">{t.timeRange.year}</option>
              </select>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-lg font-medium text-gray-800 mb-4">{t.trends.reports}</h4>
            <Line data={reportTrendsData} options={chartOptions} />
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-lg font-medium text-gray-800 mb-4">{t.trends.response}</h4>
            <Bar data={responseTimeData} options={chartOptions} />
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-lg font-medium text-gray-800 mb-4">{t.trends.categories}</h4>
            <div className="h-64">
              <Doughnut data={categoryDistributionData} options={doughnutOptions} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">{t.metrics.totalReports}</p>
                  <p className="text-2xl font-bold text-blue-700">1,234</p>
                </div>
                <TrendingUp className="w-6 h-6 text-blue-500" />
              </div>
              <div className="mt-2 text-xs text-blue-600">+12% from last period</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">{t.metrics.resolutionRate}</p>
                  <p className="text-2xl font-bold text-green-700">85%</p>
                </div>
                <TrendingUp className="w-6 h-6 text-green-500" />
              </div>
              <div className="mt-2 text-xs text-green-600">+5% from last period</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 