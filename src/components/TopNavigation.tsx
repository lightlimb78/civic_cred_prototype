import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Bell, User, LogOut, Search, Settings } from 'lucide-react';
import { Input } from './ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface TopNavigationProps {
  onLogout: () => void;
}

export function TopNavigation({ onLogout }: TopNavigationProps) {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        <h2 className="text-xl font-semibold text-gray-900">Municipal Dashboard</h2>
      </div>

      {/* Center Section - Search */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search reports, citizens, or locations..."
            className="pl-10 bg-gray-50 border-gray-200 focus:bg-white"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-5 h-5" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 bg-red-500 text-white text-xs flex items-center justify-center">
                3
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="space-y-1">
              <div className="p-3 hover:bg-gray-50 rounded-md">
                <p className="text-sm font-medium">New critical report</p>
                <p className="text-xs text-gray-500">Power outage affecting downtown area</p>
                <p className="text-xs text-gray-400 mt-1">2 minutes ago</p>
              </div>
              <div className="p-3 hover:bg-gray-50 rounded-md">
                <p className="text-sm font-medium">Report status updated</p>
                <p className="text-xs text-gray-500">Water leak on Park Avenue resolved</p>
                <p className="text-xs text-gray-400 mt-1">1 hour ago</p>
              </div>
              <div className="p-3 hover:bg-gray-50 rounded-md">
                <p className="text-sm font-medium">System maintenance</p>
                <p className="text-xs text-gray-500">Scheduled maintenance tonight at 2 AM</p>
                <p className="text-xs text-gray-400 mt-1">3 hours ago</p>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-3 px-3 hover:bg-gray-50">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground text-sm font-medium">AD</span>
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-sm font-medium text-gray-900">Admin User</p>
                <p className="text-xs text-gray-500">admin@city.gov</p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onLogout} className="text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}