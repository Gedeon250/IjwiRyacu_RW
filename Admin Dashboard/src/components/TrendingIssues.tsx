import React from 'react';
import { TrendingUp, Droplets, Loader as Road, GraduationCap, Heart } from 'lucide-react';

interface TrendingIssuesProps {
  language: 'en' | 'rw';
}

export const TrendingIssues: React.FC<TrendingIssuesProps> = ({ language }) => {
  const translations = {
    en: {
      title: 'Top Trending Issues',
      subtitle: 'Most reported categories this month',
      reports: 'reports'
    },
    rw: {
      title: 'Ibibazo Bikomeye',
      subtitle: 'Ibikubiye cyane muri uyu kwezi',
      reports: 'raporo'
    }
  };

  const t = translations[language];

  const trendingIssues = [
    { 
      id: 1, 
      category: language === 'en' ? 'Water Access' : 'Amazi',
      count: 45, 
      icon: Droplets, 
      color: 'bg-blue-500',
      trend: '+12%'
    },
    { 
      id: 2, 
      category: language === 'en' ? 'Road Repair' : 'Gusana Imihanda',
      count: 32, 
      icon: Road, 
      color: 'bg-yellow-500',
      trend: '+8%'
    },
    { 
      id: 3, 
      category: language === 'en' ? 'Education' : 'Uburezi',
      count: 28, 
      icon: GraduationCap, 
      color: 'bg-purple-500',
      trend: '+15%'
    },
    { 
      id: 4, 
      category: language === 'en' ? 'Healthcare' : 'Ubuvuzi',
      count: 23, 
      icon: Heart, 
      color: 'bg-red-500',
      trend: '+5%'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="w-5 h-5 text-orange-500" />
        <div>
          <h3 className="text-lg font-bold text-gray-800">{t.title}</h3>
          <p className="text-sm text-gray-600">{t.subtitle}</p>
        </div>
      </div>

      <div className="space-y-4">
        {trendingIssues.map((issue) => {
          const Icon = issue.icon;
          return (
            <div key={issue.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className={`p-2 ${issue.color} rounded-lg`}>
                <Icon className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-800">{issue.category}</div>
                <div className="text-sm text-gray-600">{issue.count} {t.reports}</div>
              </div>
              <div className="text-sm font-semibold text-green-600">{issue.trend}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};