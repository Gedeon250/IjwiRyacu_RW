import React, { useState } from 'react';
import { FileText, Phone, MessageSquare, Camera, MapPin, Send } from 'lucide-react';

interface ReportIssueProps {
  language: 'en' | 'rw';
}

export const ReportIssue: React.FC<ReportIssueProps> = ({ language }) => {
  const [formData, setFormData] = useState({
    district: '',
    sector: '',
    issueType: '',
    description: '',
    anonymous: false,
    contact: ''
  });

  const translations = {
    en: {
      title: 'Report an Issue',
      subtitle: 'Help us improve your community by reporting issues',
      webForm: 'Web Form',
      smsUssd: 'SMS/USSD',
      whatsapp: 'WhatsApp',
      district: 'District',
      sector: 'Sector',
      issueType: 'Issue Type',
      description: 'Description',
      contact: 'Phone Number (Optional)',
      anonymous: 'Report Anonymously',
      submit: 'Submit Report',
      smsInstructions: 'Send SMS to 4545 (Free)',
      whatsappInstructions: 'Chat with us on WhatsApp',
      photoUpload: 'Add Photo',
      location: 'Add Location',
      selectDistrict: 'Select District',
      selectSector: 'Select Sector',
      selectIssue: 'Select Issue Type',
      descriptionPlaceholder: 'Describe the issue in detail...',
      contactPlaceholder: '+250 7XX XXX XXX',
      issueTypes: {
        water: 'Water & Sanitation',
        roads: 'Roads & Infrastructure', 
        health: 'Healthcare',
        education: 'Education',
        electricity: 'Electricity',
        agriculture: 'Agriculture',
        security: 'Security',
        other: 'Other'
      }
    },
    rw: {
      title: 'Tanga Ikibazo',
      subtitle: 'Dufashe ngo dunonosore umuturage ukubiyemo utanga ibibazo',
      webForm: 'Ifishi ku Rubuga',
      smsUssd: 'SMS/USSD',
      whatsapp: 'WhatsApp',
      district: 'Akarere',
      sector: 'Umurenge',
      issueType: 'Ubwoko bw\'Ikibazo',
      description: 'Ibisobanuro',
      contact: 'Nimero ya Telefoni (Bitari Ngombwa)',
      anonymous: 'Tanga Ikibazo Utavuze Amazina',
      submit: 'Ohereza Raporo',
      smsInstructions: 'Ohereza SMS kuri 4545 (Ubuntu)',
      whatsappInstructions: 'Tugan\'ire kuri WhatsApp',
      photoUpload: 'Ongeraho Ifoto',
      location: 'Ongeraho Aho Biherereye',
      selectDistrict: 'Hitamo Akarere',
      selectSector: 'Hitamo Umurenge',
      selectIssue: 'Hitamo Ubwoko bw\'Ikibazo',
      descriptionPlaceholder: 'Sobanura ikibazo mu buryo burambuye...',
      contactPlaceholder: '+250 7XX XXX XXX',
      issueTypes: {
        water: 'Amazi n\'Isuku',
        roads: 'Imihanda n\'Ibikorwa remezo',
        health: 'Ubuvuzi',
        education: 'Uburezi',
        electricity: 'Amashanyarazi',
        agriculture: 'Ubuhinzi',
        security: 'Umutekano',
        other: 'Ikindi'
      }
    }
  };

  const t = translations[language];

  const districts = [
    'Kigali', 'Musanze', 'Rubavu', 'Nyabihu', 'Ngororero', 'Rusizi', 'Nyamasheke',
    'Karongi', 'Rutsiro', 'Gasabo', 'Kicukiro', 'Nyarugenge', 'Huye', 'Nyanza',
    'Gisagara', 'Nyaruguru', 'Nyamagabe', 'Kamonyi', 'Muhanga', 'Ruhango',
    'Nyagatare', 'Gatsibo', 'Kayonza', 'Kirehe', 'Ngoma', 'Bugesera', 'Rwamagana'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert(language === 'en' ? 'Report submitted successfully!' : 'Raporo yoherejwe neza!');
    setFormData({
      district: '',
      sector: '',
      issueType: '',
      description: '',
      anonymous: false,
      contact: ''
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{t.title}</h2>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Web Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-6">
              <FileText className="w-5 h-5 text-blue-600" />
              <h3 className="text-xl font-bold text-gray-800">{t.webForm}</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.district}
                  </label>
                  <select
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  >
                    <option value="">{t.selectDistrict}</option>
                    {districts.map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.issueType}
                  </label>
                  <select
                    value={formData.issueType}
                    onChange={(e) => setFormData({ ...formData, issueType: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  >
                    <option value="">{t.selectIssue}</option>
                    {Object.entries(t.issueTypes).map(([key, value]) => (
                      <option key={key} value={key}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.description}
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder={t.descriptionPlaceholder}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent h-32 resize-none"
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  <Camera className="w-4 h-4" />
                  {t.photoUpload}
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                  {t.location}
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.contact}
                </label>
                <input
                  type="tel"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  placeholder={t.contactPlaceholder}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={formData.anonymous}
                  onChange={(e) => setFormData({ ...formData, anonymous: e.target.checked })}
                  className="w-4 h-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="anonymous" className="text-sm text-gray-700">
                  {t.anonymous}
                </label>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                <Send className="w-4 h-4" />
                {t.submit}
              </button>
            </form>
          </div>
        </div>

        {/* Alternative Methods */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Phone className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-bold text-gray-800">{t.smsUssd}</h3>
            </div>
            <p className="text-gray-600 mb-4">{t.smsInstructions}</p>
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <p className="font-bold text-blue-800">Text to: 4545</p>
              <p className="text-sm text-blue-600">Free of charge</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-bold text-gray-800">{t.whatsapp}</h3>
            </div>
            <p className="text-gray-600 mb-4">{t.whatsappInstructions}</p>
            <button className="w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-colors font-medium">
              Open WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};