import React from 'react';
import { MessageCircle, Globe, Shield, Users } from 'lucide-react';

interface HeaderProps {
  language: 'en' | 'rw';
  setLanguage: (lang: 'en' | 'rw') => void;
  isAdmin: boolean;
  setIsAdmin: (admin: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  language, 
  setLanguage, 
  isAdmin, 
  setIsAdmin 
}) => {
  const translations = {
    en: {
      title: 'IjwiRyacu',
      subtitle: 'Our Voice for Rwanda',
      adminToggle: 'Admin View',
      publicView: 'Public View'
    },
    rw: {
      title: 'IjwiRyacu',
      subtitle: 'Ijwi Ryacu Ryu Rwanda',
      adminToggle: 'Reba Nka Umuyobozi',
      publicView: 'Reba Nka Rubanda'
    }
  };

  const t = translations[language];

  return (
    <header className="bg-gradient-to-r from-green-700 to-green-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/20 rounded-full">
              <MessageCircle className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold">{t.title}</h1>
              <p className="text-green-100 font-medium">{t.subtitle}</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex items-center gap-2 bg-white/10 rounded-lg p-2">
              <Globe className="w-4 h-4" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as 'en' | 'rw')}
                className="bg-transparent border-none text-white focus:outline-none"
              >
                <option value="en" className="text-gray-800">English</option>
                <option value="rw" className="text-gray-800">Kinyarwanda</option>
              </select>
            </div>
            
            <button
              onClick={() => setIsAdmin(!isAdmin)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                isAdmin 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {isAdmin ? <Shield className="w-4 h-4" /> : <Users className="w-4 h-4" />}
              <span className="font-medium">
                {isAdmin ? t.adminToggle : t.publicView}
              </span>
            </button>
          </div>
        </div>
        
        {/* Quick Stats Bar */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-2xl font-bold">1,203</div>
            <div className="text-green-100 text-sm">Total Reports</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-2xl font-bold">68%</div>
            <div className="text-green-100 text-sm">Resolved</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-2xl font-bold">15</div>
            <div className="text-green-100 text-sm">Active Districts</div>
          </div>
        </div>
      </div>
    </header>
  );
};