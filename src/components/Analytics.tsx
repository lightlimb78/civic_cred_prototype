import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Calendar,
  MapPin,
  Users,
  Activity
} from 'lucide-react';
import { getReportStats, getCategoryDistribution, getMonthlyTrends, mockReports } from './mockData';

export function Analytics() {
  const [timeRange, setTimeRange] = useState('6months');
  const [selectedMetric, setSelectedMetric] = useState('all');

  const stats = getReportStats();
  const categoryData = getCategoryDistribution();
  const monthlyData = getMonthlyTrends();

  // Advanced analytics data
  const resolutionTimeData = [
    { category: 'Roads', avgDays: 3.2, target: 3.0 },
    { category: 'Water', avgDays: 1.8, target: 2.0 },
    { category: 'Waste', avgDays: 2.5, target: 2.0 },
    { category: 'Public Safety', avgDays: 1.2, target: 1.0 },
    { category: 'Parks', avgDays: 4.1, target: 5.0 },
    { category: 'Utilities', avgDays: 0.8, target: 1.0 }
  ];

  const severityTrends = [
    { month: 'Aug', Critical: 8, High: 15, Medium: 18, Low: 4 },
    { month: 'Sep', Critical: 12, High: 18, Medium: 16, Low: 6 },
    { month: 'Oct', Critical: 6, High: 12, Medium: 14, Low: 6 },
    { month: 'Nov', Critical: 15, High: 20, Medium: 18, Low: 8 },
    { month: 'Dec', Critical: 9, High: 16, Medium: 14, Low: 4 },
    { month: 'Jan', Critical: 7, High: 12, Medium: 8, Low: 2 }
  ];

  const citizenEngagement = [
    { metric: 'New Users', value: 245, change: '+12%', trend: 'up' },
    { metric: 'Active Reporters', value: 189, change: '+8%', trend: 'up' },
    { metric: 'Avg Reports/User', value: 2.3, change: '+5%', trend: 'up' },
    { metric: 'User Satisfaction', value: 4.2, change: '-2%', trend: 'down' }
  ];

  const resolutionRate = 78.5;
  const avgResolutionTime = 2.4;
  const userSatisfaction = 4.2;

  const COLORS = ['#1976D2', '#FFC107', '#4CAF50', '#F44336', '#9C27B0', '#FF9800'];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600">Comprehensive performance metrics and insights</p>
        </div>
        <div className="flex gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">Last Month</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Resolution Rate</p>
                <p className="text-3xl font-bold text-gray-900">{resolutionRate}%</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+2.1%</span>
                </div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Resolution Time</p>
                <p className="text-3xl font-bold text-gray-900">{avgResolutionTime} days</p>
                <div className="flex items-center mt-1">
                  <TrendingDown className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">-0.3 days</span>
                </div>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">User Satisfaction</p>
                <p className="text-3xl font-bold text-gray-900">{userSatisfaction}/5.0</p>
                <div className="flex items-center mt-1">
                  <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                  <span className="text-sm text-red-600">-0.1</span>
                </div>
              </div>
              <div className="bg-yellow-50 p-3 rounded-lg">
                <Users className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Reports</p>
                <p className="text-3xl font-bold text-gray-900">{stats.pending + stats.approved}</p>
                <div className="flex items-center mt-1">
                  <AlertTriangle className="w-4 h-4 text-orange-500 mr-1" />
                  <span className="text-sm text-orange-600">Requires attention</span>
                </div>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg">
                <Activity className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Resolution Time by Category */}
        <Card>
          <CardHeader>
            <CardTitle>Resolution Time by Category</CardTitle>
            <CardDescription>Average days to resolve vs target</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-center items-center text-sm mb-4">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-primary rounded"></div>
                    <span>Actual Time</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-accent rounded"></div>
                    <span>Target Time</span>
                  </div>
                </div>
              </div>
              {resolutionTimeData.map((item) => (
                <div key={item.category} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium w-20">{item.category}</span>
                    <div className="flex items-center space-x-4 text-xs">
                      <span className="text-gray-600">Actual: {item.avgDays}d</span>
                      <span className="text-gray-600">Target: {item.target}d</span>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="w-full bg-gray-200 rounded-full h-6 flex">
                      <div 
                        className="bg-primary rounded-l-full h-6 flex items-center justify-end pr-2"
                        style={{ width: `${(item.avgDays / 5) * 100}%` }}
                      >
                        <span className="text-xs text-white font-medium">{item.avgDays}</span>
                      </div>
                      <div 
                        className="bg-accent/20 h-6 border-l-2 border-accent flex items-center justify-start pl-2"
                        style={{ width: `${(item.target / 5) * 100 - (item.avgDays / 5) * 100}%` }}
                      >
                        <span className="text-xs text-gray-700 font-medium">{item.target}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Severity Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Severity Distribution Over Time</CardTitle>
            <CardDescription>Report severity patterns by month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-center items-center text-sm mb-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded"></div>
                    <span>Critical</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-orange-500 rounded"></div>
                    <span>High</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                    <span>Medium</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <span>Low</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {severityTrends.map((data) => {
                  const total = data.Critical + data.High + data.Medium + data.Low;
                  const criticalPct = (data.Critical / total) * 100;
                  const highPct = (data.High / total) * 100;
                  const mediumPct = (data.Medium / total) * 100;
                  const lowPct = (data.Low / total) * 100;
                  
                  return (
                    <div key={data.month} className="text-center">
                      <div className="relative h-32 bg-gray-100 rounded mb-2 flex flex-col justify-end">
                        <div className="h-full flex flex-col justify-end">
                          <div 
                            className="bg-green-500 w-full"
                            style={{ height: `${lowPct}%`, minHeight: lowPct > 0 ? '2px' : '0' }}
                            title={`Low: ${data.Low}`}
                          />
                          <div 
                            className="bg-yellow-500 w-full"
                            style={{ height: `${mediumPct}%`, minHeight: mediumPct > 0 ? '2px' : '0' }}
                            title={`Medium: ${data.Medium}`}
                          />
                          <div 
                            className="bg-orange-500 w-full"
                            style={{ height: `${highPct}%`, minHeight: highPct > 0 ? '2px' : '0' }}
                            title={`High: ${data.High}`}
                          />
                          <div 
                            className="bg-red-500 w-full rounded-t"
                            style={{ height: `${criticalPct}%`, minHeight: criticalPct > 0 ? '2px' : '0' }}
                            title={`Critical: ${data.Critical}`}
                          />
                        </div>
                      </div>
                      <div className="text-xs font-medium text-gray-700">{data.month}</div>
                      <div className="text-xs text-gray-500">{total}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Citizen Engagement Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Citizen Engagement Metrics</CardTitle>
          <CardDescription>User activity and satisfaction indicators</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {citizenEngagement.map((metric) => (
              <div key={metric.metric} className="text-center p-4 border rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900">{metric.value}</h3>
                <p className="text-sm text-gray-600 mb-2">{metric.metric}</p>
                <Badge 
                  className={`${
                    metric.trend === 'up' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  } text-xs`}
                >
                  {metric.change}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Category Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Report Categories</CardTitle>
            <CardDescription>Current distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryData.map((category, index) => {
                const total = categoryData.reduce((sum, cat) => sum + cat.value, 0);
                const percentage = ((category.value / total) * 100).toFixed(1);
                
                return (
                  <div key={category.name} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{category.value}</span>
                        <span className="text-gray-500 text-xs">({percentage}%)</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full"
                        style={{ 
                          width: `${percentage}%`,
                          backgroundColor: COLORS[index % COLORS.length]
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Performance Summary */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Performance Summary</CardTitle>
            <CardDescription>Key insights and recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <h4 className="font-medium text-green-800">Strong Performance</h4>
                </div>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Utilities category exceeding resolution targets</li>
                  <li>• Overall resolution rate improved by 2.1%</li>
                  <li>• Water issues being handled efficiently</li>
                </ul>
              </div>

              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  <h4 className="font-medium text-yellow-800">Areas for Improvement</h4>
                </div>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Parks category resolution time above target</li>
                  <li>• User satisfaction slightly declining</li>
                  <li>• Critical issues showing upward trend</li>
                </ul>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <h4 className="font-medium text-blue-800">Recommendations</h4>
                </div>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Increase parks maintenance crew capacity</li>
                  <li>• Implement proactive citizen feedback system</li>
                  <li>• Focus on preventing critical issues</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}