export interface Report {
  id: number;
  title: string;
  category: 'Roads' | 'Water' | 'Waste' | 'Public Safety' | 'Parks' | 'Utilities';
  status: 'Pending' | 'Approved' | 'Resolved' | 'Rejected';
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  description: string;
  location: {
    address: string;
    lat: number;
    lng: number;
  };
  citizenInfo: {
    name: string;
    email: string;
    phone: string;
  };
  createdAt: string;
  resolvedAt?: string;
  imageUrl?: string;
  aiVerification: {
    score: number;
    verified: boolean;
    confidence: string;
  };
}

export const mockReports: Report[] = [
  {
    id: 1,
    title: "Pothole on Main Street",
    category: "Roads",
    status: "Pending",
    severity: "High",
    description: "Large pothole causing traffic issues and potential vehicle damage near the intersection with Oak Avenue.",
    location: {
      address: "123 Main Street, Downtown",
      lat: 40.7128,
      lng: -74.0060
    },
    citizenInfo: {
      name: "John Smith",
      email: "john.smith@email.com",
      phone: "+1-555-0123"
    },
    createdAt: "2025-01-10T08:30:00Z",
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
    aiVerification: {
      score: 0.89,
      verified: true,
      confidence: "High"
    }
  },
  {
    id: 2,
    title: "Water leak in Park Avenue",
    category: "Water",
    status: "Approved",
    severity: "Critical",
    description: "Major water leak flooding the street and affecting nearby businesses.",
    location: {
      address: "456 Park Avenue, Midtown",
      lat: 40.7614,
      lng: -73.9776
    },
    citizenInfo: {
      name: "Maria Garcia",
      email: "maria.garcia@email.com",
      phone: "+1-555-0456"
    },
    createdAt: "2025-01-09T14:15:00Z",
    imageUrl: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400",
    aiVerification: {
      score: 0.95,
      verified: true,
      confidence: "Very High"
    }
  },
  {
    id: 3,
    title: "Overflowing trash bins",
    category: "Waste",
    status: "Resolved",
    severity: "Medium",
    description: "Multiple trash bins overflowing in the residential area, attracting pests.",
    location: {
      address: "789 Elm Street, Residential",
      lat: 40.7282,
      lng: -73.7949
    },
    citizenInfo: {
      name: "David Lee",
      email: "david.lee@email.com",
      phone: "+1-555-0789"
    },
    createdAt: "2025-01-08T10:00:00Z",
    resolvedAt: "2025-01-09T16:30:00Z",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    aiVerification: {
      score: 0.78,
      verified: true,
      confidence: "Medium"
    }
  },
  {
    id: 4,
    title: "Broken streetlight",
    category: "Public Safety",
    status: "Pending",
    severity: "Medium",
    description: "Streetlight not working, creating safety concerns for pedestrians at night.",
    location: {
      address: "321 Oak Avenue, Suburban",
      lat: 40.6892,
      lng: -74.0445
    },
    citizenInfo: {
      name: "Sarah Wilson",
      email: "sarah.wilson@email.com",
      phone: "+1-555-0321"
    },
    createdAt: "2025-01-11T19:45:00Z",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400",
    aiVerification: {
      score: 0.82,
      verified: true,
      confidence: "High"
    }
  },
  {
    id: 5,
    title: "Damaged playground equipment",
    category: "Parks",
    status: "Rejected",
    severity: "Low",
    description: "Swing set appears damaged but upon inspection was found to be within safety standards.",
    location: {
      address: "555 Cedar Park, East Side",
      lat: 40.7831,
      lng: -73.9712
    },
    citizenInfo: {
      name: "Michael Johnson",
      email: "michael.johnson@email.com",
      phone: "+1-555-0555"
    },
    createdAt: "2025-01-07T11:20:00Z",
    imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400",
    aiVerification: {
      score: 0.45,
      verified: false,
      confidence: "Low"
    }
  },
  {
    id: 6,
    title: "Power outage affecting block",
    category: "Utilities",
    status: "Approved",
    severity: "Critical",
    description: "Entire city block experiencing power outage affecting residential and commercial properties.",
    location: {
      address: "100-200 Pine Street, Downtown",
      lat: 40.7505,
      lng: -73.9934
    },
    citizenInfo: {
      name: "Emily Chen",
      email: "emily.chen@email.com",
      phone: "+1-555-0100"
    },
    createdAt: "2025-01-11T22:00:00Z",
    aiVerification: {
      score: 0.92,
      verified: true,
      confidence: "Very High"
    }
  }
];

export const getReportStats = () => {
  const total = mockReports.length;
  const pending = mockReports.filter(r => r.status === 'Pending').length;
  const approved = mockReports.filter(r => r.status === 'Approved').length;
  const resolved = mockReports.filter(r => r.status === 'Resolved').length;
  const rejected = mockReports.filter(r => r.status === 'Rejected').length;

  return { total, pending, approved, resolved, rejected };
};

export const getCategoryDistribution = () => {
  const categories = mockReports.reduce((acc, report) => {
    acc[report.category] = (acc[report.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(categories).map(([name, value]) => ({ name, value }));
};

export const getMonthlyTrends = () => {
  // Mock monthly data for the past 6 months
  return [
    { month: 'Aug', reports: 45, resolved: 38 },
    { month: 'Sep', reports: 52, resolved: 41 },
    { month: 'Oct', reports: 38, resolved: 35 },
    { month: 'Nov', reports: 61, resolved: 48 },
    { month: 'Dec', reports: 43, resolved: 39 },
    { month: 'Jan', reports: 29, resolved: 18 },
  ];
};