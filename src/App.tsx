import React, { useState } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { Sidebar } from './components/Sidebar';
import { TopNavigation } from './components/TopNavigation';
import { DashboardOverview } from './components/DashboardOverview';
import { ReportList } from './components/ReportList';
import { ReportDetails } from './components/ReportDetails';
import { Analytics } from './components/Analytics';
import { Settings } from './components/Settings';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('dashboard');
  const [selectedReportId, setSelectedReportId] = useState<number | null>(null);

  const handleViewReport = (reportId: number) => {
    setSelectedReportId(reportId);
    setCurrentScreen('report-details');
  };

  const handleBackToReports = () => {
    setSelectedReportId(null);
    setCurrentScreen('reports');
  };

  const handleNavigateToReports = () => {
    setCurrentScreen('reports');
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="h-screen flex bg-gray-50">
      <Sidebar 
        currentScreen={currentScreen} 
        onNavigate={setCurrentScreen} 
      />
      
      <div className="flex-1 flex flex-col">
        <TopNavigation onLogout={() => setIsLoggedIn(false)} />
        
        <main className="flex-1 overflow-auto">
          {currentScreen === 'dashboard' && (
            <DashboardOverview onNavigateToReports={handleNavigateToReports} />
          )}
          
          {currentScreen === 'reports' && (
            <ReportList onViewReport={handleViewReport} />
          )}
          
          {currentScreen === 'report-details' && selectedReportId && (
            <ReportDetails 
              reportId={selectedReportId} 
              onBack={handleBackToReports}
            />
          )}
          
          {currentScreen === 'analytics' && <Analytics />}
          
          {currentScreen === 'settings' && <Settings />}
        </main>
      </div>
    </div>
  );
}