import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { SearchIcon, FileTextIcon, CheckCircleIcon, XCircleIcon, AlertCircleIcon, ClockIcon, UserIcon, MapPinIcon, EyeIcon, DownloadIcon, FilterIcon, BarChart3Icon, FileBarChart2Icon, CircleDollarSignIcon, PieChartIcon, UsersIcon } from 'lucide-react';
interface Application {
  id: string;
  fullName: string;
  gender: string;
  dateOfBirth: string;
  nin: string;
  type: 'Local Government' | 'State of Origin';
  lga: string;
  community: string;
  submittedDate: string;
  status: 'Submitted' | 'Under Review' | 'Approved' | 'Rejected';
  paymentAmount?: number;
  transactionId?: string;
}
interface ChartData {
  label: string;
  value: number;
  color: string;
}
const AdminDashboard: React.FC = () => {
  const {
    isAuthenticated,
    isAdmin
  } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLGA, setSelectedLGA] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'applications' | 'analytics' | 'reports'>('applications');
  const [batchProcessing, setBatchProcessing] = useState<{
    selected: string[];
    action: '' | 'approve' | 'reject' | 'review';
  }>({
    selected: [],
    action: ''
  });
  const [isProcessingBatch, setIsProcessingBatch] = useState(false);
  const [dateFilter, setDateFilter] = useState<{
    startDate: string;
    endDate: string;
  }>({
    startDate: '',
    endDate: ''
  });
  useEffect(() => {
    // Mock API call to fetch applications
    const fetchApplications = async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Mock data
      const mockApplications: Application[] = [{
        id: '1',
        fullName: 'John Okoro',
        gender: 'Male',
        dateOfBirth: '1990-05-15',
        nin: '12345678901',
        type: 'Local Government',
        lga: 'Ughelli North',
        community: 'Agbarho',
        submittedDate: '2023-09-15',
        status: 'Submitted',
        paymentAmount: 5000,
        transactionId: 'TXN-1663267200000-123'
      }, {
        id: '2',
        fullName: 'Jane Amadi',
        gender: 'Female',
        dateOfBirth: '1985-08-22',
        nin: '98765432109',
        type: 'State of Origin',
        lga: 'Ughelli South',
        community: 'Otu-Jeremi',
        submittedDate: '2023-09-18',
        status: 'Under Review',
        paymentAmount: 10000,
        transactionId: 'TXN-1663440000000-456'
      }, {
        id: '3',
        fullName: 'Michael Ossai',
        gender: 'Male',
        dateOfBirth: '1978-12-10',
        nin: '45678901234',
        type: 'Local Government',
        lga: 'Sapele',
        community: 'Sapele',
        submittedDate: '2023-09-10',
        status: 'Approved',
        paymentAmount: 5000,
        transactionId: 'TXN-1662940800000-789'
      }, {
        id: '4',
        fullName: 'Sarah Tosan',
        gender: 'Female',
        dateOfBirth: '1992-03-28',
        nin: '56789012345',
        type: 'State of Origin',
        lga: 'Kwale',
        community: 'Kwale',
        submittedDate: '2023-09-05',
        status: 'Rejected',
        paymentAmount: 10000,
        transactionId: 'TXN-1662508800000-012'
      }, {
        id: '5',
        fullName: 'David Efe',
        gender: 'Male',
        dateOfBirth: '1983-07-17',
        nin: '67890123456',
        type: 'Local Government',
        lga: 'Udu',
        community: 'Otor-Udu',
        submittedDate: '2023-09-20',
        status: 'Submitted',
        paymentAmount: 5000,
        transactionId: 'TXN-1663632000000-345'
      }, {
        id: '6',
        fullName: 'Emily Davis',
        gender: 'Female',
        dateOfBirth: '1995-11-03',
        nin: '78901234567',
        type: 'State of Origin',
        lga: 'Patani',
        community: 'Patani',
        submittedDate: '2023-09-22',
        status: 'Under Review',
        paymentAmount: 10000,
        transactionId: 'TXN-1663804800000-678'
      }, {
        id: '7',
        fullName: 'Peter Okonkwo',
        gender: 'Male',
        dateOfBirth: '1987-04-12',
        nin: '89012345678',
        type: 'Local Government',
        lga: 'Ughelli North',
        community: 'Evwreni',
        submittedDate: '2023-09-25',
        status: 'Submitted',
        paymentAmount: 5000,
        transactionId: 'TXN-1664064000000-901'
      }, {
        id: '8',
        fullName: 'Grace Adegoke',
        gender: 'Female',
        dateOfBirth: '1990-09-30',
        nin: '90123456789',
        type: 'State of Origin',
        lga: 'Sapele',
        community: 'Amukpe',
        submittedDate: '2023-09-28',
        status: 'Under Review',
        paymentAmount: 10000,
        transactionId: 'TXN-1664323200000-234'
      }, {
        id: '9',
        fullName: 'Emmanuel Okoro',
        gender: 'Male',
        dateOfBirth: '1982-02-14',
        nin: '01234567890',
        type: 'Local Government',
        lga: 'Udu',
        community: 'Aladja',
        submittedDate: '2023-09-30',
        status: 'Approved',
        paymentAmount: 5000,
        transactionId: 'TXN-1664496000000-567'
      }, {
        id: '10',
        fullName: 'Blessing Nwafor',
        gender: 'Female',
        dateOfBirth: '1993-12-25',
        nin: '12345098765',
        type: 'State of Origin',
        lga: 'Kwale',
        community: 'Obiaruku',
        submittedDate: '2023-10-01',
        status: 'Rejected',
        paymentAmount: 10000,
        transactionId: 'TXN-1664582400000-890'
      }];
      setApplications(mockApplications);
      setIsLoading(false);
    };
    fetchApplications();
  }, []);
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/login" />;
  }
  const handleUpdateStatus = (id: string, newStatus: 'Submitted' | 'Under Review' | 'Approved' | 'Rejected') => {
    setApplications(prevApplications => prevApplications.map(app => app.id === id ? {
      ...app,
      status: newStatus
    } : app));
    // Close modal if open
    if (isViewModalOpen) {
      setIsViewModalOpen(false);
    }
  };
  const handleViewApplication = (application: Application) => {
    setSelectedApplication(application);
    setIsViewModalOpen(true);
  };
  const handleBatchSelect = (id: string) => {
    setBatchProcessing(prev => {
      const isSelected = prev.selected.includes(id);
      if (isSelected) {
        return {
          ...prev,
          selected: prev.selected.filter(item => item !== id)
        };
      } else {
        return {
          ...prev,
          selected: [...prev.selected, id]
        };
      }
    });
  };
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setBatchProcessing({
        ...batchProcessing,
        selected: filteredApplications.map(app => app.id)
      });
    } else {
      setBatchProcessing({
        ...batchProcessing,
        selected: []
      });
    }
  };
  const handleBatchAction = async () => {
    if (!batchProcessing.action || batchProcessing.selected.length === 0) {
      return;
    }
    setIsProcessingBatch(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    // Update statuses
    setApplications(prevApplications => prevApplications.map(app => {
      if (batchProcessing.selected.includes(app.id)) {
        let newStatus: 'Submitted' | 'Under Review' | 'Approved' | 'Rejected';
        switch (batchProcessing.action) {
          case 'approve':
            newStatus = 'Approved';
            break;
          case 'reject':
            newStatus = 'Rejected';
            break;
          case 'review':
            newStatus = 'Under Review';
            break;
          default:
            newStatus = app.status;
        }
        return {
          ...app,
          status: newStatus
        };
      }
      return app;
    }));
    // Reset batch processing
    setBatchProcessing({
      selected: [],
      action: ''
    });
    setIsProcessingBatch(false);
  };
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Submitted':
        return <ClockIcon size={20} className="text-blue-500" />;
      case 'Under Review':
        return <AlertCircleIcon size={20} className="text-yellow-500" />;
      case 'Approved':
        return <CheckCircleIcon size={20} className="text-green-500" />;
      case 'Rejected':
        return <XCircleIcon size={20} className="text-red-500" />;
      default:
        return null;
    }
  };
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Submitted':
        return 'bg-blue-100 text-blue-800';
      case 'Under Review':
        return 'bg-yellow-100 text-yellow-800';
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  // Filter applications based on search and filters
  const filteredApplications = applications.filter(app => {
    const matchesLGA = selectedLGA ? app.lga === selectedLGA : true;
    const matchesStatus = selectedStatus ? app.status === selectedStatus : true;
    const matchesSearch = searchQuery ? app.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || app.nin.includes(searchQuery) || app.community.toLowerCase().includes(searchQuery.toLowerCase()) : true;
    // Date filtering
    let matchesDate = true;
    if (dateFilter.startDate && dateFilter.endDate) {
      const appDate = new Date(app.submittedDate);
      const startDate = new Date(dateFilter.startDate);
      const endDate = new Date(dateFilter.endDate);
      endDate.setHours(23, 59, 59); // Set end date to end of day
      matchesDate = appDate >= startDate && appDate <= endDate;
    }
    return matchesLGA && matchesStatus && matchesSearch && matchesDate;
  });
  // Generate analytics data
  const statusChartData: ChartData[] = [{
    label: 'Submitted',
    value: applications.filter(app => app.status === 'Submitted').length,
    color: 'bg-blue-500'
  }, {
    label: 'Under Review',
    value: applications.filter(app => app.status === 'Under Review').length,
    color: 'bg-yellow-500'
  }, {
    label: 'Approved',
    value: applications.filter(app => app.status === 'Approved').length,
    color: 'bg-green-500'
  }, {
    label: 'Rejected',
    value: applications.filter(app => app.status === 'Rejected').length,
    color: 'bg-red-500'
  }];
  const lgaChartData: ChartData[] = Array.from(new Set(applications.map(app => app.lga))).map(lga => {
    const count = applications.filter(app => app.lga === lga).length;
    // Generate a color based on the LGA name
    const colors = ['bg-indigo-500', 'bg-purple-500', 'bg-pink-500', 'bg-orange-500', 'bg-teal-500', 'bg-cyan-500'];
    const colorIndex = lga.charCodeAt(0) % colors.length;
    return {
      label: lga,
      value: count,
      color: colors[colorIndex]
    };
  });
  const typeChartData: ChartData[] = [{
    label: 'Local Government',
    value: applications.filter(app => app.type === 'Local Government').length,
    color: 'bg-emerald-500'
  }, {
    label: 'State of Origin',
    value: applications.filter(app => app.type === 'State of Origin').length,
    color: 'bg-violet-500'
  }];
  // Calculate total revenue
  const totalRevenue = applications.reduce((sum, app) => sum + (app.paymentAmount || 0), 0);
  // Calculate revenue by certificate type
  const localGovtRevenue = applications.filter(app => app.type === 'Local Government').reduce((sum, app) => sum + (app.paymentAmount || 0), 0);
  const stateOfOriginRevenue = applications.filter(app => app.type === 'State of Origin').reduce((sum, app) => sum + (app.paymentAmount || 0), 0);
  const renderBarChart = (data: ChartData[], title: string) => {
    const maxValue = Math.max(...data.map(item => item.value));
    return <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <div className="space-y-3">
          {data.map((item, index) => <div key={index}>
              <div className="flex justify-between text-sm mb-1">
                <span>{item.label}</span>
                <span className="font-medium">{item.value}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className={`h-2.5 rounded-full ${item.color}`} style={{
              width: `${item.value / maxValue * 100}%`
            }}></div>
              </div>
            </div>)}
        </div>
      </div>;
  };
  const renderAnalyticsTab = () => {
    return <div className="space-y-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-md p-4 flex items-center">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <UsersIcon size={24} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Applications</p>
              <p className="text-2xl font-bold">{applications.length}</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 flex items-center">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <CheckCircleIcon size={24} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Approval Rate</p>
              <p className="text-2xl font-bold">
                {applications.length > 0 ? `${Math.round(applications.filter(app => app.status === 'Approved').length / applications.length * 100)}%` : '0%'}
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 flex items-center">
            <div className="bg-purple-100 p-3 rounded-full mr-4">
              <CircleDollarSignIcon size={24} className="text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold">
                ₦{totalRevenue.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 flex items-center">
            <div className="bg-yellow-100 p-3 rounded-full mr-4">
              <ClockIcon size={24} className="text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Pending Review</p>
              <p className="text-2xl font-bold">
                {applications.filter(app => app.status === 'Submitted' || app.status === 'Under Review').length}
              </p>
            </div>
          </div>
        </div>
        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Status Distribution */}
          {renderBarChart(statusChartData, 'Application Status Distribution')}
          {/* LGA Distribution */}
          {renderBarChart(lgaChartData, 'Applications by LGA')}
        </div>
        {/* More Analytics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Certificate Type Distribution */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold mb-4">Certificate Types</h3>
            <div className="flex justify-center">
              <div className="w-32 h-32 relative rounded-full overflow-hidden">
                {typeChartData.map((item, index) => {
                const total = typeChartData.reduce((sum, i) => sum + i.value, 0);
                const percentage = total > 0 ? item.value / total * 100 : 0;
                const rotation = index === 0 ? 0 : typeChartData[0].value / total * 360;
                return <div key={index} className={`absolute w-full h-full ${item.color}`} style={{
                  clipPath: `polygon(50% 50%, 50% 0%, ${percentage >= 50 ? '100% 0%, 100% 100%, 0% 100%, 0% 0%' : `${50 + 50 * Math.sin(Math.PI * 2 * percentage / 100)}% ${50 - 50 * Math.cos(Math.PI * 2 * percentage / 100)}%`})`,
                  transform: `rotate(${rotation}deg)`
                }}></div>;
              })}
              </div>
            </div>
            <div className="mt-4 space-y-2">
              {typeChartData.map((item, index) => <div key={index} className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${item.color} mr-2`}></div>
                  <span className="text-sm">
                    {item.label}: {item.value}
                  </span>
                </div>)}
            </div>
          </div>
          {/* Revenue by Certificate Type */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold mb-4">
              Revenue by Certificate Type
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Local Government</span>
                  <span className="font-medium">
                    ₦{localGovtRevenue.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="h-2.5 rounded-full bg-emerald-500" style={{
                  width: `${totalRevenue > 0 ? localGovtRevenue / totalRevenue * 100 : 0}%`
                }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>State of Origin</span>
                  <span className="font-medium">
                    ₦{stateOfOriginRevenue.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="h-2.5 rounded-full bg-violet-500" style={{
                  width: `${totalRevenue > 0 ? stateOfOriginRevenue / totalRevenue * 100 : 0}%`
                }}></div>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between">
                <span className="font-medium">Total Revenue</span>
                <span className="font-bold">
                  ₦{totalRevenue.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {applications.slice(0, 5).map(app => <div key={app.id} className="flex items-start pb-2 border-b border-gray-100">
                  <div className={`p-1 rounded-full ${app.status === 'Approved' ? 'bg-green-100' : app.status === 'Rejected' ? 'bg-red-100' : 'bg-yellow-100'} mr-2`}>
                    {getStatusIcon(app.status)}
                  </div>
                  <div className="flex-grow">
                    <p className="text-sm font-medium">{app.fullName}</p>
                    <p className="text-xs text-gray-500">
                      {app.status} • {app.submittedDate}
                    </p>
                  </div>
                </div>)}
            </div>
          </div>
        </div>
      </div>;
  };
  const renderReportsTab = () => {
    return <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Generate Reports</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Application Status Report */}
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <BarChart3Icon size={24} className="text-blue-600" />
                </div>
                <div className="ml-4">
                  <h4 className="font-medium">Application Status Report</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Summary of applications by status, LGA, and date range
                  </p>
                  <button className="mt-3 bg-blue-600 text-white px-3 py-1.5 rounded text-sm hover:bg-blue-700">
                    Generate Report
                  </button>
                </div>
              </div>
            </div>
            {/* Revenue Report */}
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start">
                <div className="bg-green-100 p-2 rounded-lg">
                  <CircleDollarSignIcon size={24} className="text-green-600" />
                </div>
                <div className="ml-4">
                  <h4 className="font-medium">Revenue Report</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Financial summary of payments received by certificate type
                  </p>
                  <button className="mt-3 bg-green-600 text-white px-3 py-1.5 rounded text-sm hover:bg-green-700">
                    Generate Report
                  </button>
                </div>
              </div>
            </div>
            {/* LGA Performance Report */}
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <PieChartIcon size={24} className="text-purple-600" />
                </div>
                <div className="ml-4">
                  <h4 className="font-medium">LGA Performance Report</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Detailed breakdown of applications by Local Government Area
                  </p>
                  <button className="mt-3 bg-purple-600 text-white px-3 py-1.5 rounded text-sm hover:bg-purple-700">
                    Generate Report
                  </button>
                </div>
              </div>
            </div>
            {/* Processing Time Report */}
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <FileBarChart2Icon size={24} className="text-orange-600" />
                </div>
                <div className="ml-4">
                  <h4 className="font-medium">Processing Time Report</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Analysis of application processing times and efficiency
                  </p>
                  <button className="mt-3 bg-orange-600 text-white px-3 py-1.5 rounded text-sm hover:bg-orange-700">
                    Generate Report
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-6">
            <h4 className="font-medium mb-4">Custom Report</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Report Type
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option value="">Select report type</option>
                  <option value="status">Application Status</option>
                  <option value="revenue">Revenue</option>
                  <option value="lga">LGA Performance</option>
                  <option value="processing">Processing Time</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date Range
                </label>
                <div className="flex space-x-2">
                  <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                  <span className="self-center">to</span>
                  <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Format
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option value="pdf">PDF</option>
                  <option value="excel">Excel</option>
                  <option value="csv">CSV</option>
                </select>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                Generate Custom Report
              </button>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Recent Reports</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Report Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Generated On
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Format
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Monthly Status Report
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Application Status
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    2023-10-01
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    PDF
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-blue-600 hover:text-blue-800 flex items-center">
                      <DownloadIcon size={16} className="mr-1" />
                      Download
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Q3 Revenue Report
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Revenue
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    2023-09-30
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Excel
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-blue-600 hover:text-blue-800 flex items-center">
                      <DownloadIcon size={16} className="mr-1" />
                      Download
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    LGA Performance Analysis
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    LGA Performance
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    2023-09-15
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    PDF
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-blue-600 hover:text-blue-800 flex items-center">
                      <DownloadIcon size={16} className="mr-1" />
                      Download
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>;
  };
  return <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Admin Dashboard Header */}
          <div className="bg-green-700 text-white p-6">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="mt-1">Manage certificate applications</p>
          </div>
          {/* Tab Navigation */}
          <div className="bg-white border-b border-gray-200">
            <nav className="flex">
              <button onClick={() => setActiveTab('applications')} className={`px-6 py-4 text-sm font-medium ${activeTab === 'applications' ? 'border-b-2 border-green-500 text-green-600' : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                Applications
              </button>
              <button onClick={() => setActiveTab('analytics')} className={`px-6 py-4 text-sm font-medium ${activeTab === 'analytics' ? 'border-b-2 border-green-500 text-green-600' : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                Analytics
              </button>
              <button onClick={() => setActiveTab('reports')} className={`px-6 py-4 text-sm font-medium ${activeTab === 'reports' ? 'border-b-2 border-green-500 text-green-600' : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                Reports
              </button>
            </nav>
          </div>
          {/* Admin Dashboard Content */}
          <div className="p-6">
            {activeTab === 'applications' && <>
                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-blue-800">Total</h3>
                    <p className="text-3xl font-bold mt-2">
                      {applications.length}
                    </p>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-yellow-800">
                      Pending
                    </h3>
                    <p className="text-3xl font-bold mt-2">
                      {applications.filter(app => ['Submitted', 'Under Review'].includes(app.status)).length}
                    </p>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-green-800">
                      Approved
                    </h3>
                    <p className="text-3xl font-bold mt-2">
                      {applications.filter(app => app.status === 'Approved').length}
                    </p>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-red-800">
                      Rejected
                    </h3>
                    <p className="text-3xl font-bold mt-2">
                      {applications.filter(app => app.status === 'Rejected').length}
                    </p>
                  </div>
                </div>
                {/* Advanced Filters */}
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <div className="flex items-center mb-4">
                    <h3 className="text-lg font-medium">Filters</h3>
                    <button className="ml-auto text-sm text-blue-600 hover:text-blue-800" onClick={() => {
                  setSelectedLGA('');
                  setSelectedStatus('');
                  setSearchQuery('');
                  setDateFilter({
                    startDate: '',
                    endDate: ''
                  });
                }}>
                      Clear All Filters
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label htmlFor="searchQuery" className="block text-sm font-medium text-gray-700 mb-1">
                        Search
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <SearchIcon size={18} className="text-gray-400" />
                        </div>
                        <input type="text" id="searchQuery" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Search by name, NIN, community..." />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="lgaFilter" className="block text-sm font-medium text-gray-700 mb-1">
                        Filter by LGA
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FilterIcon size={18} className="text-gray-400" />
                        </div>
                        <select id="lgaFilter" value={selectedLGA} onChange={e => setSelectedLGA(e.target.value)} className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                          <option value="">All LGAs</option>
                          <option value="Ughelli North">Ughelli North</option>
                          <option value="Ughelli South">Ughelli South</option>
                          <option value="Kwale">Kwale</option>
                          <option value="Sapele">Sapele</option>
                          <option value="Udu">Udu</option>
                          <option value="Patani">Patani</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-700 mb-1">
                        Filter by Status
                      </label>
                      <select id="statusFilter" value={selectedStatus} onChange={e => setSelectedStatus(e.target.value)} className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                        <option value="">All Statuses</option>
                        <option value="Submitted">Submitted</option>
                        <option value="Under Review">Under Review</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="dateFilter" className="block text-sm font-medium text-gray-700 mb-1">
                        Date Range
                      </label>
                      <div className="flex space-x-2">
                        <input type="date" value={dateFilter.startDate} onChange={e => setDateFilter({
                      ...dateFilter,
                      startDate: e.target.value
                    })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                        <span className="self-center">-</span>
                        <input type="date" value={dateFilter.endDate} onChange={e => setDateFilter({
                      ...dateFilter,
                      endDate: e.target.value
                    })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Batch Actions */}
                {batchProcessing.selected.length > 0 && <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-center justify-between">
                    <div>
                      <span className="font-medium">
                        {batchProcessing.selected.length} applications selected
                      </span>
                      <button className="ml-4 text-sm text-blue-600 hover:text-blue-800" onClick={() => setBatchProcessing({
                  selected: [],
                  action: ''
                })}>
                        Clear Selection
                      </button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <select value={batchProcessing.action} onChange={e => setBatchProcessing({
                  ...batchProcessing,
                  action: e.target.value as any
                })} className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                        <option value="">Select Action</option>
                        <option value="review">Mark as Under Review</option>
                        <option value="approve">Approve</option>
                        <option value="reject">Reject</option>
                      </select>
                      <button onClick={handleBatchAction} disabled={!batchProcessing.action || isProcessingBatch} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-70">
                        {isProcessingBatch ? <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </span> : 'Apply'}
                      </button>
                    </div>
                  </div>}
                {/* Applications Table */}
                {isLoading ? <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
                  </div> : filteredApplications.length > 0 ? <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="py-3 px-4 text-left">
                            <input type="checkbox" checked={batchProcessing.selected.length === filteredApplications.length && filteredApplications.length > 0} onChange={e => handleSelectAll(e.target.checked)} className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded" />
                          </th>
                          <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                            Name
                          </th>
                          <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                            Type
                          </th>
                          <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                            LGA
                          </th>
                          <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                            Submitted
                          </th>
                          <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                            Payment
                          </th>
                          <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {filteredApplications.map(application => <tr key={application.id} className="hover:bg-gray-50">
                            <td className="py-4 px-4">
                              <input type="checkbox" checked={batchProcessing.selected.includes(application.id)} onChange={() => handleBatchSelect(application.id)} className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded" />
                            </td>
                            <td className="py-4 px-4 text-sm text-gray-900">
                              <div className="flex items-center">
                                <UserIcon size={18} className="mr-2 text-gray-500" />
                                {application.fullName}
                              </div>
                            </td>
                            <td className="py-4 px-4 text-sm text-gray-900">
                              {application.type}
                            </td>
                            <td className="py-4 px-4 text-sm text-gray-900">
                              <div className="flex items-center">
                                <MapPinIcon size={18} className="mr-2 text-gray-500" />
                                {application.lga}
                              </div>
                            </td>
                            <td className="py-4 px-4 text-sm text-gray-500">
                              {application.submittedDate}
                            </td>
                            <td className="py-4 px-4 text-sm text-gray-900">
                              ₦
                              {application.paymentAmount?.toLocaleString() || 0}
                            </td>
                            <td className="py-4 px-4 text-sm">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(application.status)}`}>
                                {getStatusIcon(application.status)}
                                <span className="ml-1">
                                  {application.status}
                                </span>
                              </span>
                            </td>
                            <td className="py-4 px-4 text-sm">
                              <div className="flex space-x-2">
                                <button onClick={() => handleViewApplication(application)} className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
                                  <EyeIcon size={16} className="mr-1" />
                                  View
                                </button>
                              </div>
                            </td>
                          </tr>)}
                      </tbody>
                    </table>
                  </div> : <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                    <FileTextIcon size={48} className="mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-800 mb-2">
                      No Applications Found
                    </h3>
                    <p className="text-gray-600">
                      No applications match your current filters.
                    </p>
                  </div>}
              </>}
            {activeTab === 'analytics' && renderAnalyticsTab()}
            {activeTab === 'reports' && renderReportsTab()}
          </div>
        </div>
      </div>
      {/* Application View Modal */}
      {isViewModalOpen && selectedApplication && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-green-700 text-white p-4 flex justify-between items-center">
              <h2 className="text-xl font-bold">Application Details</h2>
              <button onClick={() => setIsViewModalOpen(false)} className="text-white hover:text-gray-200">
                <XCircleIcon size={24} />
              </button>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-800 border-b pb-2">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-medium">
                      {selectedApplication.fullName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Gender</p>
                    <p className="font-medium">{selectedApplication.gender}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date of Birth</p>
                    <p className="font-medium">
                      {selectedApplication.dateOfBirth}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">NIN</p>
                    <p className="font-medium">{selectedApplication.nin}</p>
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-800 border-b pb-2">
                  Location Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Certificate Type</p>
                    <p className="font-medium">{selectedApplication.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">
                      Local Government Area
                    </p>
                    <p className="font-medium">{selectedApplication.lga}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Community/Village</p>
                    <p className="font-medium">
                      {selectedApplication.community}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-800 border-b pb-2">
                  Payment Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Amount Paid</p>
                    <p className="font-medium">
                      ₦
                      {selectedApplication.paymentAmount?.toLocaleString() || 0}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Transaction ID</p>
                    <p className="font-medium">
                      {selectedApplication.transactionId || 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-800 border-b pb-2">
                  Documents
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-md p-4 text-center">
                    <p className="text-sm text-gray-500 mb-2">
                      Passport Photograph
                    </p>
                    <div className="bg-gray-100 h-32 flex items-center justify-center">
                      <FileTextIcon size={32} className="text-gray-400" />
                    </div>
                    <button className="mt-2 text-blue-600 text-sm">View</button>
                  </div>
                  <div className="border rounded-md p-4 text-center">
                    <p className="text-sm text-gray-500 mb-2">NIN Slip</p>
                    <div className="bg-gray-100 h-32 flex items-center justify-center">
                      <FileTextIcon size={32} className="text-gray-400" />
                    </div>
                    <button className="mt-2 text-blue-600 text-sm">View</button>
                  </div>
                  <div className="border rounded-md p-4 text-center">
                    <p className="text-sm text-gray-500 mb-2">
                      Birth Certificate
                    </p>
                    <div className="bg-gray-100 h-32 flex items-center justify-center">
                      <FileTextIcon size={32} className="text-gray-400" />
                    </div>
                    <button className="mt-2 text-blue-600 text-sm">View</button>
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-800 border-b pb-2">
                  Application Status
                </h3>
                <div className="flex items-center mb-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(selectedApplication.status)}`}>
                    {getStatusIcon(selectedApplication.status)}
                    <span className="ml-1">{selectedApplication.status}</span>
                  </span>
                  <span className="ml-4 text-gray-500">
                    Submitted on {selectedApplication.submittedDate}
                  </span>
                </div>
                <div className="bg-gray-50 p-4 rounded-md">
                  <h4 className="font-medium mb-2">Update Status</h4>
                  <div className="flex flex-wrap gap-2">
                    <button onClick={() => handleUpdateStatus(selectedApplication.id, 'Under Review')} className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-md hover:bg-yellow-200">
                      Mark as Under Review
                    </button>
                    <button onClick={() => handleUpdateStatus(selectedApplication.id, 'Approved')} className="px-3 py-1 bg-green-100 text-green-800 rounded-md hover:bg-green-200">
                      Approve
                    </button>
                    <button onClick={() => handleUpdateStatus(selectedApplication.id, 'Rejected')} className="px-3 py-1 bg-red-100 text-red-800 rounded-md hover:bg-red-200">
                      Reject
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <button onClick={() => setIsViewModalOpen(false)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>}
    </div>;
};
export default AdminDashboard;