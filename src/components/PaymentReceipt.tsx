import React from 'react';
import { X, Download, Printer, CheckCircle, CreditCard, FileText, User } from 'lucide-react';

interface PaymentReceiptProps {
  isOpen: boolean;
  onClose: () => void;
  transactionData: {
    transactionId: string;
    amount: number;
    certificateType: string;
    applicantName: string;
    cardNumber: string;
    cardName: string;
    paymentDate: string;
    paymentMethod: string;
    status: 'success' | 'pending' | 'failed';
    applicationId?: string;
    processingFee?: number;
    tax?: number;
  };
}

const PaymentReceipt: React.FC<PaymentReceiptProps> = ({
  isOpen,
  onClose,
  transactionData
}) => {
  if (!isOpen) return null;

  const {
    transactionId,
    amount,
    certificateType,
    applicantName,
    cardNumber,
    cardName,
    paymentDate,
    paymentMethod,
    status,
    applicationId,
    processingFee = 0,
    tax = 0
  } = transactionData;

  const maskedCardNumber = cardNumber.replace(/\d(?=\d{4})/g, '*');
  const subtotal = amount - processingFee - tax;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Create a downloadable receipt
    const receiptContent = `
PAYMENT RECEIPT
=====================================

Transaction ID: ${transactionId}
Date: ${paymentDate}
Status: ${status.toUpperCase()}

APPLICANT INFORMATION
-------------------------------------
Name: ${applicantName}
Application ID: ${applicationId || 'Pending'}

SERVICE DETAILS
-------------------------------------
Certificate Type: ${certificateType}
Certificate Fee: ₦${subtotal.toLocaleString()}
Processing Fee: ₦${processingFee.toLocaleString()}
Tax: ₦${tax.toLocaleString()}
Total Amount: ₦${amount.toLocaleString()}

PAYMENT INFORMATION
-------------------------------------
Payment Method: ${paymentMethod}
Card Number: ${maskedCardNumber}
Cardholder: ${cardName}

=====================================
Thank you for using our service!
    `.trim();

    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt-${transactionId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="bg-green-100 p-2 rounded-full mr-3">
              <FileText size={20} className="text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Payment Receipt
            </h3>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleDownload}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              title="Download Receipt"
            >
              <Download size={18} />
            </button>
            <button
              onClick={handlePrint}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              title="Print Receipt"
            >
              <Printer size={18} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Receipt Content */}
        <div className="p-6 print:p-8" id="receipt-content">
          {/* Header with Logo */}
          <div className="text-center mb-8 print:mb-12">
            <div className="flex justify-center mb-4">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Delta_State_Logo.png/640px-Delta_State_Logo.png" 
                alt="Delta State Logo" 
                className="h-16 print:h-20"
              />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 print:text-3xl">
              Delta State Government
            </h1>
            <p className="text-gray-600 print:text-lg">
              Certificate Application Service
            </p>
            <div className="mt-4 inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full">
              <CheckCircle size={16} className="mr-2" />
              <span className="font-medium">Payment Successful</span>
            </div>
          </div>

          {/* Transaction Details */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6 print:bg-white print:border print:border-gray-300">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <FileText size={18} className="mr-2" />
              Transaction Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Transaction ID</p>
                <p className="font-mono text-sm font-medium text-gray-900">{transactionId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Date & Time</p>
                <p className="text-sm font-medium text-gray-900">{paymentDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
              </div>
              {applicationId && (
                <div>
                  <p className="text-sm text-gray-600">Application ID</p>
                  <p className="font-mono text-sm font-medium text-gray-900">{applicationId}</p>
                </div>
              )}
            </div>
          </div>

          {/* Applicant Information */}
          <div className="bg-blue-50 rounded-lg p-6 mb-6 print:bg-white print:border print:border-gray-300">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <User size={18} className="mr-2" />
              Applicant Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Full Name</p>
                <p className="text-sm font-medium text-gray-900">{applicantName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Certificate Type</p>
                <p className="text-sm font-medium text-gray-900">{certificateType} Certificate</p>
              </div>
            </div>
          </div>

          {/* Payment Breakdown */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Payment Breakdown
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Certificate Fee</span>
                <span className="font-medium">₦{subtotal.toLocaleString()}</span>
              </div>
              {processingFee > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Processing Fee</span>
                  <span className="font-medium">₦{processingFee.toLocaleString()}</span>
                </div>
              )}
              {tax > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">₦{tax.toLocaleString()}</span>
                </div>
              )}
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between">
                  <span className="text-lg font-semibold text-gray-900">Total Amount</span>
                  <span className="text-lg font-bold text-green-600">₦{amount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-purple-50 rounded-lg p-6 mb-6 print:bg-white print:border print:border-gray-300">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <CreditCard size={18} className="mr-2" />
              Payment Method
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Method</p>
                <p className="text-sm font-medium text-gray-900">{paymentMethod}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Card Number</p>
                <p className="font-mono text-sm font-medium text-gray-900">{maskedCardNumber}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-gray-600">Cardholder Name</p>
                <p className="text-sm font-medium text-gray-900">{cardName}</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 pt-6 text-center text-sm text-gray-600">
            <p className="mb-2">
              This is an electronically generated receipt and is valid without signature.
            </p>
            <p className="mb-2">
              For inquiries, please contact support at support@deltastate.gov.ng
            </p>
            <p className="font-medium">
              Thank you for using Delta State Certificate Application Service!
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 print:hidden">
          <button
            onClick={handleDownload}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors flex items-center"
          >
            <Download size={16} className="mr-2" />
            Download
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors flex items-center"
          >
            <Printer size={16} className="mr-2" />
            Print
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentReceipt;
