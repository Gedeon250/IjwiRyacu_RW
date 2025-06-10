import React from 'react';
import { MapView } from './MapView';
import { TrendingIssues } from './TrendingIssues';
import { SuccessStories } from './SuccessStories';

interface DashboardProps {
  language: 'en' | 'rw';
}

export const Dashboard: React.FC<DashboardProps> = ({ language }) => {
  const translations = {
    en: {
      title: 'Rwanda Issue Monitoring Dashboard',
      subtitle: 'Real-time view of citizen reports across all districts'
    },
    rw: {
      title: 'Ikiyobozi cy\'Ibibazo muri Rwanda',
      subtitle: 'Kureba mu gihe nyacyo raporo z\'abaturage mu turere twose'
    }
  };

  const t = translations[language];

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{t.title}</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">{t.subtitle}</p>
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2">
          <MapView language={language} />
        </div>
        <div className="space-y-8">
          <TrendingIssues language={language} />
          <SuccessStories language={language} />
        </div>
      </div>
    </div>
  );
};