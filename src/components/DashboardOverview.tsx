import React from 'react';
import { FileText, CheckCircle, Clock, XCircle, TrendingUp, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { getReportStats, getCategoryDistribution, getMonthlyTrends, mockReports } from './mockData';

interface DashboardOverviewProps {
  onNavigateToReports: () => void;
}

export function DashboardOverview({ onNavigateToReports }: DashboardOverviewProps) {
  const stats = getReportStats();
  const categoryData = getCategoryDistribution();
  const monthlyData = getMonthlyTrends();
  const recentReports = mockReports.slice(0, 5);

  const COLORS = ['#1976D2', '#FFC107', '#4CAF50', '#F44336', '#9C27B0', '#FF9800'];

  const statCards = [
    {
      title: 'Total Reports',
      value: stats.total,
      icon: FileText,
      description: 'All time reports',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Pending',
      value: stats.pending,
      icon: Clock,
      description: 'Awaiting review',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Resolved',
      value: stats.resolved,
      icon: CheckCircle,
      description: 'Issues fixed',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Rejected',
      value: stats.rejected,
      icon: XCircle,
      description: 'Invalid reports',
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      'Pending': 'bg-orange-100 text-orange-800',
      'Approved': 'bg-blue-100 text-blue-800',
      'Resolved': 'bg-green-100 text-green-800',
      'Rejected': 'bg-red-100 text-red-800'
    };
    return variants[status as keyof typeof variants] || 'bg-gray-100 text-gray-800';
  };

  const getSeverityBadge = (severity: string) => {
    const variants = {
      'Low': 'bg-gray-100 text-gray-800',
      'Medium': 'bg-yellow-100 text-yellow-800',
      'High': 'bg-orange-100 text-orange-800',
      'Critical': 'bg-red-100 text-red-800'
    };
    return variants[severity as keyof typeof variants] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600">Monitor and manage civic issue reports</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
                  </div>
                  <div className={`${stat.bgColor} p-3 rounded-lg`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Reports by Category</CardTitle>
            <CardDescription>Distribution of issues by type</CardDescription>
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
                        <span className="text-gray-600">{category.value}</span>
                        <span className="text-gray-500">({percentage}%)</span>
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

        {/* Monthly Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Trends</CardTitle>
            <CardDescription>Reports received vs resolved over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-center items-center text-sm mb-4">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-primary rounded"></div>
                    <span>Reports Received</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span>Reports Resolved</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {monthlyData.map((data) => {
                  const maxValue = Math.max(...monthlyData.map(d => d.reports));
                  const reportsHeight = (data.reports / maxValue) * 100;
                  const resolvedHeight = (data.resolved / maxValue) * 100;
                  
                  return (
                    <div key={data.month} className="text-center">
                      <div className="relative h-32 bg-gray-100 rounded mb-2 flex items-end justify-center">
                        <div className="flex items-end space-x-1 w-full px-1">
                          <div 
                            className="bg-primary rounded-t flex-1"
                            style={{ height: `${reportsHeight}%`, minHeight: '4px' }}
                            title={`${data.reports} reports`}
                          />
                          <div 
                            className="bg-green-500 rounded-t flex-1"
                            style={{ height: `${resolvedHeight}%`, minHeight: '4px' }}
                            title={`${data.resolved} resolved`}
                          />
                        </div>
                      </div>
                      <div className="text-xs font-medium text-gray-700">{data.month}</div>
                      <div className="text-xs text-gray-500">{data.reports}/{data.resolved}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Reports */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Reports</CardTitle>
            <CardDescription>Latest civic issues reported by citizens</CardDescription>
          </div>
          <Button onClick={onNavigateToReports}>View All Reports</Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-medium text-gray-900">{report.title}</h4>
                    <Badge className={`${getStatusBadge(report.status)} text-xs`}>
                      {report.status}
                    </Badge>
                    <Badge className={`${getSeverityBadge(report.severity)} text-xs`}>
                      {report.severity}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{report.location.address}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(report.createdAt).toLocaleDateString()} • {report.category}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {report.severity === 'Critical' && (
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                  )}
                  <Button variant="outline" size="sm" onClick={onNavigateToReports}>
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}