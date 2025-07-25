import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { DownloadIcon, PrinterIcon } from 'lucide-react';
const ViewCertificate: React.FC = () => {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const {
    isAuthenticated
  } = useAuth();
  // In a real application, you would fetch the certificate data from your API
  const certificateData = {
    id: id,
    fullName: 'John Doe',
    gender: 'Male',
    dateOfBirth: '1990-05-15',
    lga: 'Ughelli North',
    state: 'Delta',
    certificateType: 'Local Government',
    issueDate: '2023-09-20',
    expiryDate: '2028-09-19',
    serialNumber: `LG-UGN-2023-${id}`,
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=LG-UGN-2023-001'
  };
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  const handlePrint = () => {
    window.print();
  };
  return <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Certificate Actions */}
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">
              Certificate of Origin
            </h1>
            <div className="flex space-x-3">
              <button onClick={handlePrint} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                <PrinterIcon size={18} className="mr-2" />
                Print
              </button>
              <a href="#download" download className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                <DownloadIcon size={18} className="mr-2" />
                Download
              </a>
            </div>
          </div>
          {/* Certificate Document */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden print:shadow-none" id="certificate">
            {/* Certificate Header */}
            <div className="bg-green-700 text-white p-6 text-center print:bg-green-700">
              <div className="flex justify-center mb-4">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Delta_State_Logo.png/640px-Delta_State_Logo.png" alt="Delta State Logo" className="h-20" />
              </div>
              <h2 className="text-2xl font-bold uppercase">
                Federal Republic of Nigeria
              </h2>
              <h3 className="text-xl">Delta State Government</h3>
              <h4 className="text-lg mt-2">
                {certificateData.certificateType} Certificate
              </h4>
            </div>
            {/* Certificate Body */}
            <div className="p-8 border-b border-gray-200">
              <div className="flex flex-col md:flex-row justify-between mb-8">
                <div>
                  <p className="text-gray-600 mb-1">Serial Number:</p>
                  <p className="font-semibold">
                    {certificateData.serialNumber}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Issue Date:</p>
                  <p className="font-semibold">{certificateData.issueDate}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Expiry Date:</p>
                  <p className="font-semibold">{certificateData.expiryDate}</p>
                </div>
              </div>
              <div className="mb-8">
                <h3 className="text-xl font-bold text-green-700 mb-4">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600 mb-1">Full Name:</p>
                    <p className="font-semibold">{certificateData.fullName}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Gender:</p>
                    <p className="font-semibold">{certificateData.gender}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Date of Birth:</p>
                    <p className="font-semibold">
                      {certificateData.dateOfBirth}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mb-8">
                <h3 className="text-xl font-bold text-green-700 mb-4">
                  Origin Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600 mb-1">Local Government Area:</p>
                    <p className="font-semibold">{certificateData.lga}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">State:</p>
                    <p className="font-semibold">{certificateData.state}</p>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-6 mt-6">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <div className="mb-4 md:mb-0">
                    <p className="text-gray-600 mb-1">Verification QR Code:</p>
                    <img src={certificateData.qrCode} alt="Verification QR Code" className="h-32 w-32" />
                  </div>
                  <div className="text-center md:text-right">
                    <div className="mb-16">
                      <p className="text-gray-600">Authorized Signature</p>
                    </div>
                    <p className="font-semibold">
                      Chairman, {certificateData.lga} LGA
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Certificate Footer */}
            <div className="bg-gray-100 p-4 text-center text-sm text-gray-600">
              <p>
                This certificate is issued under the authority of the Delta
                State Government.
              </p>
              <p>
                To verify the authenticity of this certificate, scan the QR code
                or visit https://verification.deltastate.gov.ng
              </p>
            </div>
          </div>
          {/* Back to Dashboard */}
          <div className="mt-6 text-center">
            <Link to="/dashboard" className="text-green-600 hover:text-green-800 font-medium">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>;
};
export default ViewCertificate;