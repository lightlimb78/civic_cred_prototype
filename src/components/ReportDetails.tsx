import React, { useState } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  User, 
  Phone, 
  Mail, 
  Camera, 
  Shield, 
  CheckCircle, 
  XCircle, 
  Clock,
  AlertTriangle,
  Edit,
  MessageSquare,
  FileText,
  Download
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { Alert, AlertDescription } from './ui/alert';
import { mockReports } from './mockData';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ReportDetailsProps {
  reportId: number;
  onBack: () => void;
}

export function ReportDetails({ reportId, onBack }: ReportDetailsProps) {
  const [currentStatus, setCurrentStatus] = useState<string>('');
  const [adminNotes, setAdminNotes] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const report = mockReports.find(r => r.id === reportId);

  if (!report) {
    return (
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-6">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Reports
          </Button>
        </div>
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Report not found. Please go back and try again.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  React.useEffect(() => {
    setCurrentStatus(report.status);
  }, [report.status]);

  const handleStatusUpdate = async () => {
    setIsUpdating(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsUpdating(false);
    // In a real app, this would update the report status
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      'Pending': { class: 'bg-orange-100 text-orange-800', icon: Clock },
      'Approved': { class: 'bg-blue-100 text-blue-800', icon: CheckCircle },
      'Resolved': { class: 'bg-green-100 text-green-800', icon: CheckCircle },
      'Rejected': { class: 'bg-red-100 text-red-800', icon: XCircle }
    };
    return variants[status as keyof typeof variants] || { class: 'bg-gray-100 text-gray-800', icon: Clock };
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

  const statusBadge = getStatusBadge(report.status);
  const StatusIcon = statusBadge.icon;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Reports
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Report #{report.id}</h1>
            <p className="text-gray-600">{report.title}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Badge className={`${statusBadge.class} flex items-center space-x-1`}>
            <StatusIcon className="w-3 h-3" />
            <span>{report.status}</span>
          </Badge>
          <Badge className={`${getSeverityBadge(report.severity)}`}>
            {report.severity}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Report Details */}
          <Card>
            <CardHeader>
              <CardTitle>Report Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                <p className="text-gray-700 leading-relaxed">{report.description}</p>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    Location
                  </h4>
                  <p className="text-gray-700">{report.location.address}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Coordinates: {report.location.lat}, {report.location.lng}
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    Timeline
                  </h4>
                  <p className="text-gray-700">
                    Reported: {new Date(report.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                  {report.resolvedAt && (
                    <p className="text-gray-700">
                      Resolved: {new Date(report.resolvedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  )}
                </div>
              </div>

              {report.imageUrl && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                    <Camera className="w-4 h-4 mr-2" />
                    Attached Photo
                  </h4>
                  <div className="relative">
                    <ImageWithFallback
                      src={report.imageUrl}
                      alt={`Photo of ${report.title}`}
                      className="w-full max-w-md h-64 object-cover rounded-lg border"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* AI Verification */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                AI Verification
              </CardTitle>
              <CardDescription>
                Automated analysis of report authenticity and severity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Verification Status</span>
                  <Badge className={report.aiVerification.verified ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                    {report.aiVerification.verified ? 'Verified' : 'Unverified'}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="font-medium">Confidence Score</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${report.aiVerification.score * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{(report.aiVerification.score * 100).toFixed(0)}%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-medium">Confidence Level</span>
                  <Badge className="bg-blue-100 text-blue-800">
                    {report.aiVerification.confidence}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Admin Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Administrative Actions</CardTitle>
              <CardDescription>
                Update report status and add administrative notes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Update Status
                </label>
                <Select value={currentStatus} onValueChange={setCurrentStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending Review</SelectItem>
                    <SelectItem value="Approved">Approved</SelectItem>
                    <SelectItem value="Resolved">Resolved</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Administrative Notes
                </label>
                <Textarea
                  placeholder="Add notes about this report..."
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  rows={4}
                />
              </div>

              <div className="flex space-x-3">
                <Button 
                  onClick={handleStatusUpdate}
                  disabled={isUpdating || currentStatus === report.status}
                >
                  {isUpdating ? 'Updating...' : 'Update Report'}
                </Button>
                <Button variant="outline">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Contact Citizen
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Citizen Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                Citizen Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="font-medium text-gray-900">{report.citizenInfo.name}</p>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                <span>{report.citizenInfo.email}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <span>{report.citizenInfo.phone}</span>
              </div>

              <Separator />

              <div className="text-sm text-gray-600">
                <p>Reports filed: 3</p>
                <p>Resolution rate: 100%</p>
                <p>Member since: Jan 2024</p>
              </div>
            </CardContent>
          </Card>

          {/* Category & Priority */}
          <Card>
            <CardHeader>
              <CardTitle>Classification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-600">Category</label>
                <p className="font-medium text-gray-900">{report.category}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-600">Severity Level</label>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge className={getSeverityBadge(report.severity)}>
                    {report.severity}
                  </Badge>
                  {report.severity === 'Critical' && (
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                  )}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">Department</label>
                <p className="font-medium text-gray-900">
                  {report.category === 'Roads' ? 'Public Works' :
                   report.category === 'Water' ? 'Water Department' :
                   report.category === 'Waste' ? 'Sanitation' :
                   report.category === 'Public Safety' ? 'Police Department' :
                   report.category === 'Parks' ? 'Parks & Recreation' :
                   'Utilities Department'}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MapPin className="w-4 h-4 mr-2" />
                View on Map
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Edit className="w-4 h-4 mr-2" />
                Edit Details
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}