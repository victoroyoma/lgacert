import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FileTextIcon, ClockIcon, CheckCircleIcon, XCircleIcon, AlertCircleIcon, PlusIcon, Users2Icon, FileBarChart2Icon, AwardIcon } from 'lucide-react';
interface Application {
  id: string;
  type: 'Local Government' | 'State of Origin';
  lga: string;
  status: 'Submitted' | 'Under Review' | 'Approved' | 'Rejected';
  submittedDate: string;
  certificateId?: string;
}
const Dashboard: React.FC = () => {
  const {
    user,
    isAuthenticated
  } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Mock API call to fetch user applications
    const fetchApplications = async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Mock data
      const mockApplications: Application[] = [{
        id: '1',
        type: 'Local Government',
        lga: 'Ughelli North',
        status: 'Approved',
        submittedDate: '2023-09-15',
        certificateId: 'LG-UGN-2023-001'
      }, {
        id: '2',
        type: 'State of Origin',
        lga: 'Ughelli North',
        status: 'Under Review',
        submittedDate: '2023-10-05'
      }];
      setApplications(mockApplications);
      setIsLoading(false);
    };
    fetchApplications();
  }, []);
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
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
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Dashboard Header */}
          <div className="bg-green-700 text-white p-8 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome, {user?.name}!</h1>
              <p className="text-green-100 text-lg">Easily manage your certificate applications below.</p>
            </div>
            <Link
              to="/apply"
              className="mt-4 md:mt-0 bg-white text-green-800 px-6 py-3 rounded-lg font-semibold shadow hover:bg-green-100 flex items-center transition-colors duration-150"
            >
              <PlusIcon size={22} className="mr-2" />
              New Application
            </Link>
          </div>
          {/* Dashboard Content */}
          <div className="p-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="flex items-center bg-green-50 border border-green-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
                <Users2Icon size={36} className="text-green-600 mr-4" />
                <div>
                  <h3 className="text-lg font-medium text-green-800">Total Applications</h3>
                  <p className="text-3xl font-bold mt-1">{applications.length}</p>
                </div>
              </div>
              <div className="flex items-center bg-blue-50 border border-blue-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
                <FileBarChart2Icon size={36} className="text-blue-600 mr-4" />
                <div>
                  <h3 className="text-lg font-medium text-blue-800">In Progress</h3>
                  <p className="text-3xl font-bold mt-1">{applications.filter(app => ['Submitted', 'Under Review'].includes(app.status)).length}</p>
                </div>
              </div>
              <div className="flex items-center bg-purple-50 border border-purple-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
                <AwardIcon size={36} className="text-purple-600 mr-4" />
                <div>
                  <h3 className="text-lg font-medium text-purple-800">Certificates</h3>
                  <p className="text-3xl font-bold mt-1">{applications.filter(app => app.status === 'Approved').length}</p>
                </div>
              </div>
            </div>
            {/* Applications */}
            <div className="mb-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-4">
                <h2 className="text-xl font-bold text-gray-800">Your Applications</h2>
                <Link
                  to="/apply"
                  className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 flex items-center font-medium shadow transition-colors duration-150"
                >
                  <PlusIcon size={18} className="mr-1" />
                  New Application
                </Link>
              </div>
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-b-4 border-green-500 mb-4"></div>
                  <p className="text-green-700 font-medium text-lg">Loading your applications...</p>
                </div>
              ) : applications.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-200 rounded-lg text-sm">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="py-3 px-4 text-left font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="py-3 px-4 text-left font-semibold text-gray-500 uppercase tracking-wider">LGA</th>
                        <th className="py-3 px-4 text-left font-semibold text-gray-500 uppercase tracking-wider">Submitted Date</th>
                        <th className="py-3 px-4 text-left font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="py-3 px-4 text-left font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {applications.map(application => (
                        <tr key={application.id} className="hover:bg-green-50 transition-colors">
                          <td className="py-4 px-4 text-gray-900">
                            <div className="flex items-center">
                              <FileTextIcon size={18} className="mr-2 text-gray-500" />
                              {application.type}
                            </div>
                          </td>
                          <td className="py-4 px-4 text-gray-900">{application.lga}</td>
                          <td className="py-4 px-4 text-gray-500">{application.submittedDate}</td>
                          <td className="py-4 px-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(application.status)}`}>
                              {getStatusIcon(application.status)}
                              <span className="ml-1">{application.status}</span>
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            {application.status === 'Approved' && application.certificateId ? (
                              <Link
                                to={`/certificate/${application.certificateId}`}
                                className="text-green-600 hover:text-green-800 font-semibold underline transition-colors"
                              >
                                View Certificate
                              </Link>
                            ) : (
                              <span className="text-gray-400">No actions available</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-10 text-center flex flex-col items-center">
                  <img src="https://cdn.jsdelivr.net/gh/edent/SuperTinyIcons/images/svg/file.svg" alt="No Applications" className="mx-auto mb-6" style={{ width: 64, height: 64, opacity: 0.5 }} />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">No Applications Yet</h3>
                  <p className="text-gray-600 mb-4">You haven't submitted any certificate applications yet.</p>
                  <Link to="/apply" className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 inline-flex items-center font-medium shadow transition-colors duration-150">
                    <PlusIcon size={18} className="mr-1" />
                    Start New Application
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;