import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { 
  User, 
  Bell, 
  Shield, 
  Database, 
  Users, 
  Settings as SettingsIcon,
  Save,
  RefreshCw,
  Download,
  Upload,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

export function Settings() {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      critical: true,
      resolved: false,
      weekly: true
    },
    system: {
      autoAssign: true,
      aiVerification: true,
      publicDashboard: false,
      maintenanceMode: false
    },
    thresholds: {
      critical: '24',
      high: '72',
      medium: '168',
      low: '336'
    }
  });

  const [isSaving, setIsSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  const updateNotificationSetting = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value
      }
    }));
  };

  const updateSystemSetting = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      system: {
        ...prev.system,
        [key]: value
      }
    }));
  };

  const updateThreshold = (key: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      thresholds: {
        ...prev.thresholds,
        [key]: value
      }
    }));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Manage your account and system preferences</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset to Default
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      {savedMessage && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Settings saved successfully!
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Account Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                Account Settings
              </CardTitle>
              <CardDescription>
                Manage your admin account information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="Admin" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="User" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue="admin@city.gov" />
              </div>
              
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
              </div>

              <div>
                <Label htmlFor="department">Department</Label>
                <Select defaultValue="municipal">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="municipal">Municipal Administration</SelectItem>
                    <SelectItem value="works">Public Works</SelectItem>
                    <SelectItem value="safety">Public Safety</SelectItem>
                    <SelectItem value="utilities">Utilities</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Notification Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="w-5 h-5 mr-2" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Choose how you want to be notified about system events
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="emailNotif">Email Notifications</Label>
                  <p className="text-sm text-gray-500">Receive notifications via email</p>
                </div>
                <Switch
                  id="emailNotif"
                  checked={settings.notifications.email}
                  onCheckedChange={(checked) => updateNotificationSetting('email', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="pushNotif">Push Notifications</Label>
                  <p className="text-sm text-gray-500">Receive browser push notifications</p>
                </div>
                <Switch
                  id="pushNotif"
                  checked={settings.notifications.push}
                  onCheckedChange={(checked) => updateNotificationSetting('push', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="criticalNotif">Critical Reports</Label>
                  <p className="text-sm text-gray-500">Immediate alerts for critical issues</p>
                </div>
                <Switch
                  id="criticalNotif"
                  checked={settings.notifications.critical}
                  onCheckedChange={(checked) => updateNotificationSetting('critical', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="resolvedNotif">Resolution Updates</Label>
                  <p className="text-sm text-gray-500">Notify when reports are resolved</p>
                </div>
                <Switch
                  id="resolvedNotif"
                  checked={settings.notifications.resolved}
                  onCheckedChange={(checked) => updateNotificationSetting('resolved', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="weeklyNotif">Weekly Summary</Label>
                  <p className="text-sm text-gray-500">Weekly performance summary</p>
                </div>
                <Switch
                  id="weeklyNotif"
                  checked={settings.notifications.weekly}
                  onCheckedChange={(checked) => updateNotificationSetting('weekly', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* System Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <SettingsIcon className="w-5 h-5 mr-2" />
                System Configuration
              </CardTitle>
              <CardDescription>
                Configure system behavior and features
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="autoAssign">Auto-Assignment</Label>
                  <p className="text-sm text-gray-500">Automatically assign reports to departments</p>
                </div>
                <Switch
                  id="autoAssign"
                  checked={settings.system.autoAssign}
                  onCheckedChange={(checked) => updateSystemSetting('autoAssign', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="aiVerification">AI Verification</Label>
                  <p className="text-sm text-gray-500">Enable AI-powered report verification</p>
                </div>
                <Switch
                  id="aiVerification"
                  checked={settings.system.aiVerification}
                  onCheckedChange={(checked) => updateSystemSetting('aiVerification', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="publicDashboard">Public Dashboard</Label>
                  <p className="text-sm text-gray-500">Allow public access to dashboard</p>
                </div>
                <Switch
                  id="publicDashboard"
                  checked={settings.system.publicDashboard}
                  onCheckedChange={(checked) => updateSystemSetting('publicDashboard', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="maintenance">Maintenance Mode</Label>
                  <p className="text-sm text-gray-500">Temporarily disable citizen reporting</p>
                </div>
                <Switch
                  id="maintenance"
                  checked={settings.system.maintenanceMode}
                  onCheckedChange={(checked) => updateSystemSetting('maintenanceMode', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Response Time Thresholds */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Response Time Thresholds
              </CardTitle>
              <CardDescription>
                Set target response times for different severity levels (in hours)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="critical">Critical Issues</Label>
                  <Input
                    id="critical"
                    type="number"
                    value={settings.thresholds.critical}
                    onChange={(e) => updateThreshold('critical', e.target.value)}
                    placeholder="24"
                  />
                  <p className="text-xs text-gray-500 mt-1">Hours</p>
                </div>
                
                <div>
                  <Label htmlFor="high">High Priority</Label>
                  <Input
                    id="high"
                    type="number"
                    value={settings.thresholds.high}
                    onChange={(e) => updateThreshold('high', e.target.value)}
                    placeholder="72"
                  />
                  <p className="text-xs text-gray-500 mt-1">Hours</p>
                </div>
                
                <div>
                  <Label htmlFor="medium">Medium Priority</Label>
                  <Input
                    id="medium"
                    type="number"
                    value={settings.thresholds.medium}
                    onChange={(e) => updateThreshold('medium', e.target.value)}
                    placeholder="168"
                  />
                  <p className="text-xs text-gray-500 mt-1">Hours (1 week)</p>
                </div>
                
                <div>
                  <Label htmlFor="low">Low Priority</Label>
                  <Input
                    id="low"
                    type="number"
                    value={settings.thresholds.low}
                    onChange={(e) => updateThreshold('low', e.target.value)}
                    placeholder="336"
                  />
                  <p className="text-xs text-gray-500 mt-1">Hours (2 weeks)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* System Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="w-5 h-5 mr-2" />
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Database</span>
                <Badge className="bg-green-100 text-green-800">Online</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">API Service</span>
                <Badge className="bg-green-100 text-green-800">Healthy</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">AI Service</span>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">Notifications</span>
                <Badge className="bg-green-100 text-green-800">Running</Badge>
              </div>

              <Separator />

              <div className="text-sm space-y-1">
                <p><span className="font-medium">Uptime:</span> 99.9%</p>
                <p><span className="font-medium">Last Backup:</span> 2h ago</p>
                <p><span className="font-medium">Version:</span> 2.1.0</p>
              </div>
            </CardContent>
          </Card>

          {/* Data Management */}
          <Card>
            <CardHeader>
              <CardTitle>Data Management</CardTitle>
              <CardDescription>
                Export and backup system data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Download className="w-4 h-4 mr-2" />
                Export Reports
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <Download className="w-4 h-4 mr-2" />
                Export Analytics
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <Upload className="w-4 h-4 mr-2" />
                Import Data
              </Button>

              <Separator />

              <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                <Database className="w-4 h-4 mr-2" />
                Backup Database
              </Button>
            </CardContent>
          </Card>

          {/* User Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                User Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm space-y-1">
                <p><span className="font-medium">Active Users:</span> 1,247</p>
                <p><span className="font-medium">New This Month:</span> 89</p>
                <p><span className="font-medium">Admin Users:</span> 5</p>
              </div>

              <Separator />

              <Button variant="outline" className="w-full justify-start">
                <Users className="w-4 h-4 mr-2" />
                Manage Users
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}