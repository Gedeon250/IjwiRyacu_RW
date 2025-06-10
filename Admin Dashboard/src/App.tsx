import React, { useState } from 'react';
import { Header } from './components/Header';
import { TabNavigation } from './components/TabNavigation';
import { Dashboard } from './components/Dashboard';
import { ReportIssue } from './components/ReportIssue';
import { TrackReports } from './components/TrackReports';
import { DataAccountability } from './components/DataAccountability';
import { AdminDashboard } from './components/AdminDashboard';

export type TabType = 'dashboard' | 'report' | 'track' | 'data' | 'admin';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [isAdmin, setIsAdmin] = useState(false);
  const [language, setLanguage] = useState<'en' | 'rw'>('en');

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard language={language} />;
      case 'report':
        return <ReportIssue language={language} />;
      case 'track':
        return <TrackReports language={language} />;
      case 'data':
        return <DataAccountability language={language} />;
      case 'admin':
        return <AdminDashboard language={language} />;
      default:
        return <Dashboard language={language} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Header 
        language={language}
        setLanguage={setLanguage}
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
      />
      <TabNavigation 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        language={language}
        isAdmin={isAdmin}
      />
      <main className="container mx-auto px-4 py-6">
        {renderActiveTab()}
      </main>
    </div>
  );
}

export default App;