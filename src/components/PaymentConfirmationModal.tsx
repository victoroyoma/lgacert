import React from 'react';
import { X, AlertTriangle, CreditCard } from 'lucide-react';

interface PaymentConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  amount: number;
  certificateType: string;
  cardNumber: string;
  cardName: string;
  applicantName: string;
  isProcessing?: boolean;
}

const PaymentConfirmationModal: React.FC<PaymentConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  amount,
  certificateType,
  cardNumber,
  cardName,
  applicantName,
  isProcessing = false
}) => {
  if (!isOpen) return null;

  const maskedCardNumber = cardNumber.replace(/\d(?=\d{4})/g, '*');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="bg-yellow-100 p-2 rounded-full mr-3">
              <AlertTriangle size={20} className="text-yellow-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Confirm Payment
            </h3>
          </div>
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6">
            <p className="text-gray-600 mb-4">
              Please review your payment details before proceeding:
            </p>
            
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Applicant:</span>
                <span className="text-sm font-medium text-gray-900">{applicantName}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Certificate Type:</span>
                <span className="text-sm font-medium text-gray-900">{certificateType}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Amount:</span>
                <span className="text-sm font-bold text-green-600">₦{amount.toLocaleString()}</span>
              </div>
              
              <div className="border-t border-gray-200 pt-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Payment Method:</span>
                  <div className="flex items-center">
                    <CreditCard size={16} className="text-gray-400 mr-2" />
                    <span className="text-sm font-medium text-gray-900">
                      {maskedCardNumber}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-sm text-gray-600">Cardholder:</span>
                  <span className="text-sm font-medium text-gray-900">{cardName}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-6">
            <p className="text-sm text-blue-700">
              <strong>Note:</strong> By proceeding, you authorize the payment of ₦{amount.toLocaleString()} 
              for your {certificateType.toLowerCase()} certificate application. This transaction is secure and encrypted.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isProcessing}
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-70 flex items-center"
          >
            {isProcessing ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              `Confirm Payment`
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmationModal;
