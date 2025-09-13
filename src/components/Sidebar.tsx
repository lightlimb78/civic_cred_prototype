import React from 'react';
import { Shield, Home, FileText, BarChart3, Settings } from 'lucide-react';

interface SidebarProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
}

export function Sidebar({ currentScreen, onNavigate }: SidebarProps) {
  const navigationItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: Home,
      description: 'Overview & metrics'
    },
    { 
      id: 'reports', 
      label: 'Reports', 
      icon: FileText,
      description: 'Manage civic issues'
    },
    { 
      id: 'analytics', 
      label: 'Analytics', 
      icon: BarChart3,
      description: 'Performance insights'
    },
    { 
      id: 'settings', 
      label: 'Settings', 
      icon: Settings,
      description: 'System configuration'
    },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-md">
            <Shield className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">CivicCred</h1>
            <p className="text-sm text-gray-500">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id || 
              (item.id === 'reports' && currentScreen === 'report-details');
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <div className="flex-1 text-left">
                    <div className="font-medium">{item.label}</div>
                    <div className={`text-xs ${
                      isActive ? 'text-primary-foreground/80' : 'text-gray-500'
                    }`}>
                      {item.description}
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 text-center">
          <p>Version 2.1.0</p>
          <p>© 2025 CivicCred</p>
        </div>
      </div>
    </div>
  );
}