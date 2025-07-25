import React, { useState, Fragment } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import FormStep from '../components/FormStep';
import PaymentProcessor from '../components/PaymentProcessor';
import MinorApplicationSection from '../components/MinorApplicationSection';
import { UserIcon, MapPinIcon, FileIcon, CheckCircleIcon, ArrowLeftIcon, ArrowRightIcon, UploadIcon, CreditCardIcon } from 'lucide-react';
const ApplicationForm: React.FC = () => {
  const {
    isAuthenticated
  } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMinorApplication, setIsMinorApplication] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    surname: '',
    middleName: '', // optional
    gender: '',
    dateOfBirth: '',
    phone: '',
    nin: '',
    // Minor Application Fields
    isMinor: false,
    guardianName: '',
    relationship: '',
    guardianPhone: '',
    guardianEmail: '',
    guardianId: null as File | null,
    authorizationLetter: null as File | null,
    guardianDeclaration: false,
    // Location Information
    certificateType: 'Local Government',
    lga: '',
    community: '',
    address: '',
    // Documents
    passport: null as File | null,
    ninSlip: null as File | null,
    birthCertificate: null as File | null,
    // Payment
    paymentComplete: false,
    transactionId: '',
    // Declaration
    declaration: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  // Get certificate price based on type
  const getCertificatePrice = () => {
    return formData.certificateType === 'Local Government' ? 5000 : 10000;
  };
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};
    if (step === 1) {
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.surname) newErrors.surname = 'Surname is required';
      // middleName is optional
      if (!formData.gender) newErrors.gender = 'Gender is required';
      if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
      if (!formData.phone) newErrors.phone = 'Phone number is required';
      // Check if it's a minor application (based on date of birth)
      const birthDate = new Date(formData.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const isMinor = age < 18;
      // For adult applications, require NIN
      if (!isMinor && !formData.nin) {
        newErrors.nin = 'NIN is required for applicants 18 and above';
      } else if (!isMinor && formData.nin && !/^\d{11}$/.test(formData.nin)) {
        newErrors.nin = 'NIN must be 11 digits';
      }
      // For minor applications, validate guardian information
      if (isMinor) {
        if (!formData.guardianName) newErrors.guardianName = 'Guardian name is required';
        if (!formData.relationship) newErrors.relationship = 'Relationship to minor is required';
        if (!formData.guardianPhone) newErrors.guardianPhone = 'Guardian phone number is required';
        if (!formData.guardianId) newErrors.guardianId = 'Guardian ID is required';
        if (!formData.birthCertificate) newErrors.birthCertificate = 'Birth certificate is required';
        // If guardian is not a parent, require authorization letter
        if (formData.relationship && formData.relationship !== 'parent' && !formData.authorizationLetter) {
          newErrors.authorizationLetter = 'Authorization letter is required when guardian is not a parent';
        }
        if (!formData.guardianDeclaration) {
          newErrors.guardianDeclaration = 'Guardian declaration is required';
        }
      }
    } else if (step === 2) {
      if (!formData.certificateType) newErrors.certificateType = 'Certificate type is required';
      if (!formData.lga) newErrors.lga = 'LGA is required';
      if (!formData.community) newErrors.community = 'Community is required';
      if (!formData.address) newErrors.address = 'Address is required';
    } else if (step === 3) {
      if (!formData.passport) newErrors.passport = 'Passport photograph is required';
      // Only require NIN slip for adult applications
      if (!isMinorApplication && !formData.ninSlip) {
        newErrors.ninSlip = 'NIN slip is required';
      }
      // Birth certificate is checked in step 1 for minors
      if (!isMinorApplication && !formData.birthCertificate) {
        newErrors.birthCertificate = 'Birth certificate is required';
      }
    } else if (step === 4) {
      if (!formData.paymentComplete) newErrors.payment = 'Payment is required to proceed';
    } else if (step === 5) {
      if (!formData.declaration) newErrors.declaration = 'You must accept the declaration';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };
  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo(0, 0);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const {
      name,
      value,
      type
    } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    // Special handling for isMinor checkbox
    if (name === 'isMinor') {
      setIsMinorApplication(checked || false);
    }
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    // Clear error when field is being edited
    if (errors[name]) {
      const newErrors = {
        ...errors
      };
      delete newErrors[name];
      setErrors(newErrors);
    }
    // If date of birth changes, check if applicant is a minor
    if (name === 'dateOfBirth' && value) {
      const birthDate = new Date(value);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      // Check if birthday has occurred this year
      if (today.getMonth() < birthDate.getMonth() || today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate()) {
        // Birthday hasn't occurred yet this year
        setIsMinorApplication(age - 1 < 18);
      } else {
        setIsMinorApplication(age < 18);
      }
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0] || null;
    setFormData({
      ...formData,
      [fieldName]: file
    });
    // Clear error when field is being edited
    if (errors[fieldName]) {
      const newErrors = {
        ...errors
      };
      delete newErrors[fieldName];
      setErrors(newErrors);
    }
  };
  const handlePaymentComplete = (transactionId: string) => {
    setFormData({
      ...formData,
      paymentComplete: true,
      transactionId: transactionId
    });
    // Move to next step after payment is complete
    setTimeout(() => {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }, 1000);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(5)) {
      setIsSubmitting(true);
      // Simulate API call to submit application
      try {
        // In a real application, you would send the formData to your backend
        await new Promise(resolve => setTimeout(resolve, 2000));
        // Redirect to dashboard after successful submission
        navigate('/dashboard');
      } catch (error) {
        console.error('Error submitting application:', error);
        setIsSubmitting(false);
      }
    }
  };
  const renderProgressBar = () => {
    const steps = [{
      number: 1,
      title: 'Personal Info',
      icon: UserIcon
    }, {
      number: 2,
      title: 'Location',
      icon: MapPinIcon
    }, {
      number: 3,
      title: 'Documents',
      icon: FileIcon
    }, {
      number: 4,
      title: 'Payment',
      icon: CreditCardIcon
    }, {
      number: 5,
      title: 'Submit',
      icon: CheckCircleIcon
    }];
    return <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => <Fragment key={step.number}>
              <div className="flex flex-col items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${currentStep >= step.number ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                  <step.icon size={20} />
                </div>
                <span className={`mt-2 text-xs font-medium ${currentStep >= step.number ? 'text-green-600' : 'text-gray-500'}`}>
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && <div className={`flex-1 h-1 mx-2 ${currentStep > step.number ? 'bg-green-600' : 'bg-gray-200'}`}></div>}
            </Fragment>)}
        </div>
      </div>;
  };
  return <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-green-700 text-white p-6">
            <h1 className="text-2xl font-bold">Certificate Application</h1>
            <p className="mt-1">
              Complete the form to apply for your certificate
            </p>
          </div>
          <div className="p-6">
            {renderProgressBar()}
            <form onSubmit={handleSubmit}>
              <FormStep title="Personal Information" currentStep={currentStep} stepNumber={1}>
                <div className="flex items-center mb-6">
                  <input id="isMinor" name="isMinor" type="checkbox" checked={isMinorApplication} onChange={handleInputChange} className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded" />
                  <label htmlFor="isMinor" className="ml-2 block text-sm font-medium text-gray-700">
                    This is an application for a minor (under 18 years)
                  </label>
                  <div className="ml-2 group relative">
                    <div className="cursor-help bg-gray-200 text-gray-600 rounded-full w-5 h-5 flex items-center justify-center">
                      ?
                    </div>
                    <div className="hidden group-hover:block absolute z-10 w-64 bg-black text-white text-xs p-2 rounded-md -mt-1 ml-2">
                      For applicants under 18, a parent or legal guardian must
                      provide authorization and additional documentation.
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`} placeholder={isMinorApplication ? "Enter minor's first name" : 'Enter your first name'} />
                    {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label htmlFor="surname" className="block text-sm font-medium text-gray-700 mb-1">
                      Surname
                    </label>
                    <input type="text" id="surname" name="surname" value={formData.surname} onChange={handleInputChange} className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.surname ? 'border-red-500' : 'border-gray-300'}`} placeholder={isMinorApplication ? "Enter minor's surname" : 'Enter your surname'} />
                    {errors.surname && <p className="mt-1 text-sm text-red-600">{errors.surname}</p>}
                  </div>
                  <div>
                    <label htmlFor="middleName" className="block text-sm font-medium text-gray-700 mb-1">
                      Middle Name <span className="text-gray-400">(optional)</span>
                    </label>
                    <input type="text" id="middleName" name="middleName" value={formData.middleName} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 border-gray-300" placeholder={isMinorApplication ? "Enter minor's middle name (optional)" : 'Enter your middle name (optional)'} />
                  </div>
                  <div>
                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                      Gender
                    </label>
                    <select id="gender" name="gender" value={formData.gender} onChange={handleInputChange} className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.gender ? 'border-red-500' : 'border-gray-300'}`}>
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                    {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender}</p>}
                  </div>
                  <div>
                    <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
                      Date of Birth
                    </label>
                    <input type="date" id="dateOfBirth" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'}`} />
                    {errors.dateOfBirth && <p className="mt-1 text-sm text-red-600">
                        {errors.dateOfBirth}
                      </p>}
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      {isMinorApplication ? 'Contact Phone Number' : 'Phone Number'}
                    </label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`} placeholder="Enter phone number" />
                    {errors.phone && <p className="mt-1 text-sm text-red-600">
                        {errors.phone}
                      </p>}
                  </div>
                  {!isMinorApplication && <div className="md:col-span-2">
                      <label htmlFor="nin" className="block text-sm font-medium text-gray-700 mb-1">
                        National Identification Number (NIN)
                      </label>
                      <input type="text" id="nin" name="nin" value={formData.nin} onChange={handleInputChange} className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.nin ? 'border-red-500' : 'border-gray-300'}`} placeholder="Enter your 11-digit NIN" />
                      {errors.nin && <p className="mt-1 text-sm text-red-600">
                          {errors.nin}
                        </p>}
                    </div>}
                </div>
                <MinorApplicationSection isMinorApplication={isMinorApplication} formData={formData} errors={errors} handleInputChange={handleInputChange} handleFileChange={handleFileChange} />
              </FormStep>
              <FormStep title="Location Information" currentStep={currentStep} stepNumber={2}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="certificateType" className="block text-sm font-medium text-gray-700 mb-1">
                      Certificate Type
                    </label>
                    <select id="certificateType" name="certificateType" value={formData.certificateType} onChange={handleInputChange} className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.certificateType ? 'border-red-500' : 'border-gray-300'}`}>
                      <option value="Local Government">Local Government</option>
                      <option value="State of Origin">State of Origin</option>
                    </select>
                    <p className="mt-1 text-sm text-gray-500">
                      {formData.certificateType === 'Local Government' ? 'Local Government Certificate fee: ₦5,000' : 'State of Origin Certificate fee: ₦10,000'}
                    </p>
                    {errors.certificateType && <p className="mt-1 text-sm text-red-600">
                        {errors.certificateType}
                      </p>}
                  </div>
                  <div>
                    <label htmlFor="lga" className="block text-sm font-medium text-gray-700 mb-1">
                      Local Government Area
                    </label>
                    <select id="lga" name="lga" value={formData.lga} onChange={handleInputChange} className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.lga ? 'border-red-500' : 'border-gray-300'}`}>
                      <option value="">Select LGA</option>
                      <option value="Ughelli North">Ughelli North</option>
                      <option value="Ughelli South">Ughelli South</option>
                      <option value="Kwale">Kwale (Ndokwa West)</option>
                      <option value="Sapele">Sapele</option>
                      <option value="Udu">Udu</option>
                      <option value="Patani">Patani</option>
                    </select>
                    {errors.lga && <p className="mt-1 text-sm text-red-600">{errors.lga}</p>}
                  </div>
                  <div>
                    <label htmlFor="community" className="block text-sm font-medium text-gray-700 mb-1">
                      Community/Village
                    </label>
                    <input type="text" id="community" name="community" value={formData.community} onChange={handleInputChange} className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.community ? 'border-red-500' : 'border-gray-300'}`} placeholder="Enter your community or village" />
                    {errors.community && <p className="mt-1 text-sm text-red-600">
                        {errors.community}
                      </p>}
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Residential Address
                    </label>
                    <textarea id="address" name="address" value={formData.address} onChange={handleInputChange} rows={3} className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.address ? 'border-red-500' : 'border-gray-300'}`} placeholder="Enter your current residential address"></textarea>
                    {errors.address && <p className="mt-1 text-sm text-red-600">
                        {errors.address}
                      </p>}
                  </div>
                </div>
              </FormStep>
              <FormStep title="Document Upload" currentStep={currentStep} stepNumber={3}>
                <p className="mb-4 text-gray-600">
                  Please upload the following documents in JPG, PNG, or PDF
                  format (max 5MB each).
                </p>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="passport" className="block text-sm font-medium text-gray-700 mb-1">
                      {isMinorApplication ? "Minor's Passport Photograph" : 'Passport Photograph'}
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <UploadIcon className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" />
                        <div className="flex text-sm text-gray-600">
                          <label htmlFor="passport" className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none">
                            <span>Upload a file</span>
                            <input id="passport" name="passport" type="file" className="sr-only" accept=".jpg,.jpeg,.png,.pdf" onChange={e => handleFileChange(e, 'passport')} />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          JPG, PNG, PDF up to 5MB
                        </p>
                      </div>
                    </div>
                    {formData.passport && <p className="mt-2 text-sm text-green-600">
                        File selected: {formData.passport.name}
                      </p>}
                    {errors.passport && <p className="mt-1 text-sm text-red-600">
                        {errors.passport}
                      </p>}
                  </div>
                  {!isMinorApplication && <>
                      <div>
                        <label htmlFor="ninSlip" className="block text-sm font-medium text-gray-700 mb-1">
                          NIN Slip
                        </label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                          <div className="space-y-1 text-center">
                            <UploadIcon className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" />
                            <div className="flex text-sm text-gray-600">
                              <label htmlFor="ninSlip" className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none">
                                <span>Upload a file</span>
                                <input id="ninSlip" name="ninSlip" type="file" className="sr-only" accept=".jpg,.jpeg,.png,.pdf" onChange={e => handleFileChange(e, 'ninSlip')} />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">
                              JPG, PNG, PDF up to 5MB
                            </p>
                          </div>
                        </div>
                        {formData.ninSlip && <p className="mt-2 text-sm text-green-600">
                            File selected: {formData.ninSlip.name}
                          </p>}
                        {errors.ninSlip && <p className="mt-1 text-sm text-red-600">
                            {errors.ninSlip}
                          </p>}
                      </div>
                      <div>
                        <label htmlFor="birthCertificate" className="block text-sm font-medium text-gray-700 mb-1">
                          Birth Certificate or Age Declaration
                        </label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                          <div className="space-y-1 text-center">
                            <UploadIcon className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" />
                            <div className="flex text-sm text-gray-600">
                              <label htmlFor="birthCertificate" className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none">
                                <span>Upload a file</span>
                                <input id="birthCertificate" name="birthCertificate" type="file" className="sr-only" accept=".jpg,.jpeg,.png,.pdf" onChange={e => handleFileChange(e, 'birthCertificate')} />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">
                              JPG, PNG, PDF up to 5MB
                            </p>
                          </div>
                        </div>
                        {formData.birthCertificate && <p className="mt-2 text-sm text-green-600">
                            File selected: {formData.birthCertificate.name}
                          </p>}
                        {errors.birthCertificate && <p className="mt-1 text-sm text-red-600">
                            {errors.birthCertificate}
                          </p>}
                      </div>
                    </>}
                  {isMinorApplication && <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                      <p className="text-sm text-blue-700">
                        <strong>Note:</strong> Additional documents for minor
                        applications (birth certificate, guardian ID, etc.) were
                        collected in the Personal Information section.
                      </p>
                    </div>}
                </div>
              </FormStep>
              {/* Payment Step */}
              <FormStep title="Payment" currentStep={currentStep} stepNumber={4}>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">
                    Certificate Fee
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Please complete the payment to proceed with your
                    application.
                  </p>
                  {formData.paymentComplete ? <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
                      <div className="flex items-center">
                        <CheckCircleIcon size={24} className="text-green-600 mr-2" />
                        <div>
                          <h4 className="font-semibold text-green-800">
                            Payment Successful
                          </h4>
                          <p className="text-green-700">
                            Your payment of ₦
                            {getCertificatePrice().toLocaleString()} has been
                            processed successfully.
                          </p>
                          <p className="text-sm text-green-600 mt-1">
                            Transaction ID: {formData.transactionId}
                          </p>
                        </div>
                      </div>
                    </div> : <PaymentProcessor amount={getCertificatePrice()} certificateType={formData.certificateType} onPaymentComplete={handlePaymentComplete} onCancel={() => handlePrevious()} />}
                </div>
              </FormStep>
              <FormStep title="Declaration and Submission" currentStep={currentStep} stepNumber={5}>
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6">
                  <h4 className="font-semibold text-yellow-800 mb-2">
                    Declaration
                  </h4>
                  <p className="text-yellow-700 mb-4">
                    I hereby declare that the information provided in this
                    application is true and correct to the best of my knowledge.
                    I understand that any false statement may result in the
                    rejection of my application or the revocation of any
                    certificate issued.
                    {isMinorApplication && ' I confirm that I am authorized to apply for this certificate on behalf of the minor applicant.'}
                  </p>
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input id="declaration" name="declaration" type="checkbox" checked={formData.declaration} onChange={handleInputChange} className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded" />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="declaration" className="font-medium text-gray-700">
                        I agree to the declaration above
                      </label>
                    </div>
                  </div>
                  {errors.declaration && <p className="mt-1 text-sm text-red-600">
                      {errors.declaration}
                    </p>}
                </div>
                <div className="bg-gray-50 p-4 rounded-md">
                  <h4 className="font-semibold mb-2">Application Summary</h4>
                  <dl className="divide-y divide-gray-200">
                    <div className="py-2 grid grid-cols-3">
                      <dt className="text-sm font-medium text-gray-500">
                        {isMinorApplication ? "Minor's Name:" : 'Full Name:'}
                      </dt>
                      <dd className="text-sm text-gray-900 col-span-2">
                        {`${formData.surname} ${formData.firstName}${formData.middleName ? ' ' + formData.middleName : ''}`.trim() || 'Not provided'}
                      </dd>
                    </div>
                    {isMinorApplication && <div className="py-2 grid grid-cols-3">
                        <dt className="text-sm font-medium text-gray-500">
                          Guardian Name:
                        </dt>
                        <dd className="text-sm text-gray-900 col-span-2">
                          {formData.guardianName || 'Not provided'}
                        </dd>
                      </div>}
                    <div className="py-2 grid grid-cols-3">
                      <dt className="text-sm font-medium text-gray-500">
                        Certificate Type:
                      </dt>
                      <dd className="text-sm text-gray-900 col-span-2">
                        {formData.certificateType}
                      </dd>
                    </div>
                    <div className="py-2 grid grid-cols-3">
                      <dt className="text-sm font-medium text-gray-500">
                  <div>
                    <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
                      Date of Birth
                    </label>
                    <input type="date" id="dateOfBirth" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'}`} />
                    {errors.dateOfBirth && <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth}</p>}
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`} placeholder="Enter phone number" />
                    {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                  </div>
                  {!isMinorApplication && <div className="md:col-span-2">
                      <input type="text" id="nin" name="nin" value={formData.nin} onChange={handleInputChange} className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.nin ? 'border-red-500' : 'border-gray-300'}`} placeholder="Enter your 11-digit NIN" />
                      {errors.nin && <p className="mt-1 text-sm text-red-600">{errors.nin}</p>}
                    </div>}
                      </dt>
                      <dd className="text-sm text-gray-900 col-span-2">
                        ₦{getCertificatePrice().toLocaleString()} (Paid) -
                        Transaction ID: {formData.transactionId}
                      </dd>
                    </div>
                  </dl>
                </div>
              </FormStep>
              <div className="mt-8 flex justify-between">
                {currentStep > 1 && currentStep !== 4 && <button type="button" onClick={handlePrevious} className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    <ArrowLeftIcon size={16} className="mr-2" />
                    Previous
                  </button>}
                {currentStep < 5 ? currentStep !== 4 && <button type="button" onClick={handleNext} className="ml-auto flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                      Next
                      <ArrowRightIcon size={16} className="ml-2" />
                    </button> : <button type="submit" disabled={isSubmitting} className="ml-auto px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-70">
                    {isSubmitting ? <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </span> : 'Submit Application'}
                  </button>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>;
};
export default ApplicationForm;