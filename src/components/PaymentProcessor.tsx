import React, { useState } from 'react';
import { CreditCardIcon, LockIcon, CalendarIcon, CheckCircleIcon } from 'lucide-react';
interface PaymentProcessorProps {
  amount: number;
  certificateType: string;
  onPaymentComplete: (transactionId: string) => void;
  onCancel: () => void;
}
const PaymentProcessor: React.FC<PaymentProcessorProps> = ({
  amount,
  certificateType,
  onPaymentComplete,
  onCancel
}) => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formatCardNumber = (value: string) => {
    // Remove any non-digit characters
    const digits = value.replace(/\D/g, '');
    // Add space after every 4 digits
    const formatted = digits.replace(/(\d{4})(?=\d)/g, '$1 ');
    // Limit to 19 characters (16 digits + 3 spaces)
    return formatted.slice(0, 19);
  };
  const formatExpiryDate = (value: string) => {
    // Remove any non-digit characters
    const digits = value.replace(/\D/g, '');
    // Format as MM/YY
    if (digits.length >= 3) {
      return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
    } else if (digits.length === 2) {
      return `${digits}/`;
    }
    return digits;
  };
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!cardNumber.trim()) {
      newErrors.cardNumber = 'Card number is required';
    } else if (cardNumber.replace(/\s/g, '').length !== 16) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    }
    if (!cardName.trim()) {
      newErrors.cardName = 'Cardholder name is required';
    }
    if (!expiryDate.trim()) {
      newErrors.expiryDate = 'Expiry date is required';
    } else {
      const [month, year] = expiryDate.split('/');
      const currentYear = new Date().getFullYear() % 100;
      const currentMonth = new Date().getMonth() + 1;
      if (!month || !year || parseInt(month) > 12 || parseInt(month) < 1) {
        newErrors.expiryDate = 'Invalid expiry date';
      } else if (parseInt(year) < currentYear || parseInt(year) === currentYear && parseInt(month) < currentMonth) {
        newErrors.expiryDate = 'Card has expired';
      }
    }
    if (!cvv.trim()) {
      newErrors.cvv = 'CVV is required';
    } else if (cvv.length !== 3) {
      newErrors.cvv = 'CVV must be 3 digits';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setIsProcessing(true);
    // Simulate payment processing
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsCompleted(true);
      // Generate a mock transaction ID
      const transactionId = `TXN-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      // Wait a moment before completing
      setTimeout(() => {
        onPaymentComplete(transactionId);
      }, 1500);
    } catch (error) {
      setErrors({
        submit: 'Payment processing failed. Please try again.'
      });
      setIsProcessing(false);
    }
  };
  return <div className="bg-white rounded-lg shadow-md p-6">
      {isCompleted ? <div className="text-center py-8">
          <div className="flex justify-center">
            <div className="bg-green-100 p-3 rounded-full">
              <CheckCircleIcon size={48} className="text-green-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold mt-4 text-gray-800">
            Payment Successful!
          </h2>
          <p className="text-gray-600 mt-2">
            Your payment of ₦{amount.toLocaleString()} for {certificateType}{' '}
            Certificate has been processed successfully.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Redirecting to complete your application...
          </p>
        </div> : <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Payment Details
            </h2>
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-md text-sm font-medium">
              ₦{amount.toLocaleString()}
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-md mb-6">
            <h3 className="font-medium text-gray-700 mb-2">Order Summary</h3>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">
                {certificateType} Certificate
              </span>
              <span className="font-medium">₦{amount.toLocaleString()}</span>
            </div>
            <div className="border-t border-gray-200 my-2 pt-2 flex justify-between">
              <span className="font-medium">Total</span>
              <span className="font-bold">₦{amount.toLocaleString()}</span>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Card Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CreditCardIcon size={16} className="text-gray-400" />
                </div>
                <input id="cardNumber" type="text" value={cardNumber} onChange={e => setCardNumber(formatCardNumber(e.target.value))} className={`w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'}`} placeholder="1234 5678 9012 3456" maxLength={19} />
              </div>
              {errors.cardNumber && <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                Cardholder Name
              </label>
              <input id="cardName" type="text" value={cardName} onChange={e => setCardName(e.target.value)} className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.cardName ? 'border-red-500' : 'border-gray-300'}`} placeholder="John Doe" />
              {errors.cardName && <p className="mt-1 text-sm text-red-600">{errors.cardName}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CalendarIcon size={16} className="text-gray-400" />
                  </div>
                  <input id="expiryDate" type="text" value={expiryDate} onChange={e => setExpiryDate(formatExpiryDate(e.target.value))} className={`w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.expiryDate ? 'border-red-500' : 'border-gray-300'}`} placeholder="MM/YY" maxLength={5} />
                </div>
                {errors.expiryDate && <p className="mt-1 text-sm text-red-600">
                    {errors.expiryDate}
                  </p>}
              </div>
              <div>
                <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                  CVV
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LockIcon size={16} className="text-gray-400" />
                  </div>
                  <input id="cvv" type="text" value={cvv} onChange={e => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))} className={`w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.cvv ? 'border-red-500' : 'border-gray-300'}`} placeholder="123" maxLength={3} />
                </div>
                {errors.cvv && <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>}
              </div>
            </div>
            <div className="flex items-center justify-center mb-4">
              <div className="flex space-x-2">
                <img src="https://www.mastercard.com.ng/content/dam/public/mastercardcom/na/global-site/images/logos/mc-logo-52.svg" alt="Mastercard" className="h-8" />
                <img src="https://www.visa.co.uk/dam/VCOM/regional/ve/romania/blogs/hero-image/visa-logo-800x450.jpg" alt="Visa" className="h-8" />
              </div>
            </div>
            {errors.submit && <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                {errors.submit}
              </div>}
            <div className="flex justify-between">
              <button type="button" onClick={onCancel} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Cancel
              </button>
              <button type="submit" disabled={isProcessing} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-70">
                {isProcessing ? <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span> : `Pay ₦${amount.toLocaleString()}`}
              </button>
            </div>
          </form>
        </>}
    </div>;
};
export default PaymentProcessor;