import React, { useState } from 'react';
import { UserIcon, Users2Icon, UploadIcon, InfoIcon, ClipboardCheckIcon } from 'lucide-react';
interface MinorApplicationSectionProps {
  isMinorApplication: boolean;
  formData: any;
  errors: Record<string, string>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => void;
}
const MinorApplicationSection: React.FC<MinorApplicationSectionProps> = ({
  isMinorApplication,
  formData,
  errors,
  handleInputChange,
  handleFileChange
}) => {
  if (!isMinorApplication) return null;
  return <div className="border-t border-gray-200 mt-6 pt-6">
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
        <div className="flex items-start">
          <InfoIcon className="text-blue-500 mt-1 mr-3 flex-shrink-0" size={20} />
          <div>
            <h4 className="font-semibold text-blue-800">
              Minor Application Information
            </h4>
            <p className="text-blue-700 text-sm mt-1">
              This section is for applicants under 18 years of age. A parent or
              legal guardian must provide their information and authorization
              documents.
            </p>
          </div>
        </div>
      </div>
      <h4 className="text-lg font-medium mb-4">Guardian Information</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label htmlFor="guardianName" className="block text-sm font-medium text-gray-700 mb-1">
            Guardian Full Name
          </label>
          <input type="text" id="guardianName" name="guardianName" value={formData.guardianName || ''} onChange={handleInputChange} className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.guardianName ? 'border-red-500' : 'border-gray-300'}`} placeholder="Enter guardian's full name" />
          {errors.guardianName && <p className="mt-1 text-sm text-red-600">{errors.guardianName}</p>}
        </div>
        <div>
          <label htmlFor="relationship" className="block text-sm font-medium text-gray-700 mb-1">
            Relationship to Minor
          </label>
          <select id="relationship" name="relationship" value={formData.relationship || ''} onChange={handleInputChange} className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.relationship ? 'border-red-500' : 'border-gray-300'}`}>
            <option value="">Select relationship</option>
            <option value="parent">Parent</option>
            <option value="legal_guardian">Legal Guardian</option>
            <option value="relative">Relative with Authorization</option>
            <option value="other">Other (specify in notes)</option>
          </select>
          {errors.relationship && <p className="mt-1 text-sm text-red-600">{errors.relationship}</p>}
        </div>
        <div>
          <label htmlFor="guardianPhone" className="block text-sm font-medium text-gray-700 mb-1">
            Guardian Phone Number
          </label>
          <input type="tel" id="guardianPhone" name="guardianPhone" value={formData.guardianPhone || ''} onChange={handleInputChange} className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.guardianPhone ? 'border-red-500' : 'border-gray-300'}`} placeholder="Enter guardian's phone number" />
          {errors.guardianPhone && <p className="mt-1 text-sm text-red-600">{errors.guardianPhone}</p>}
        </div>
        <div>
          <label htmlFor="guardianEmail" className="block text-sm font-medium text-gray-700 mb-1">
            Guardian Email (Optional)
          </label>
          <input type="email" id="guardianEmail" name="guardianEmail" value={formData.guardianEmail || ''} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Enter guardian's email address" />
        </div>
      </div>
      <h4 className="text-lg font-medium mb-4">Required Documents</h4>
      <div className="space-y-6">
        <div>
          <label htmlFor="birthCertificate" className="block text-sm font-medium text-gray-700 mb-1">
            Minor's Birth Certificate
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
              <p className="text-xs text-gray-500">JPG, PNG, PDF up to 5MB</p>
            </div>
          </div>
          {formData.birthCertificate && <p className="mt-2 text-sm text-green-600">
              File selected: {formData.birthCertificate.name}
            </p>}
          {errors.birthCertificate && <p className="mt-1 text-sm text-red-600">
              {errors.birthCertificate}
            </p>}
        </div>
        <div>
          <label htmlFor="guardianId" className="block text-sm font-medium text-gray-700 mb-1">
            Guardian's ID (National ID, Voter's Card, Driver's License)
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <UploadIcon className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" />
              <div className="flex text-sm text-gray-600">
                <label htmlFor="guardianId" className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none">
                  <span>Upload a file</span>
                  <input id="guardianId" name="guardianId" type="file" className="sr-only" accept=".jpg,.jpeg,.png,.pdf" onChange={e => handleFileChange(e, 'guardianId')} />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">JPG, PNG, PDF up to 5MB</p>
            </div>
          </div>
          {formData.guardianId && <p className="mt-2 text-sm text-green-600">
              File selected: {formData.guardianId.name}
            </p>}
          {errors.guardianId && <p className="mt-1 text-sm text-red-600">{errors.guardianId}</p>}
        </div>
        <div>
          <label htmlFor="authorizationLetter" className="block text-sm font-medium text-gray-700 mb-1">
            Authorization Letter or Affidavit (If guardian is not a parent)
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <UploadIcon className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" />
              <div className="flex text-sm text-gray-600">
                <label htmlFor="authorizationLetter" className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none">
                  <span>Upload a file</span>
                  <input id="authorizationLetter" name="authorizationLetter" type="file" className="sr-only" accept=".jpg,.jpeg,.png,.pdf" onChange={e => handleFileChange(e, 'authorizationLetter')} />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">JPG, PNG, PDF up to 5MB</p>
              <p className="text-xs text-gray-500 mt-1">
                (Only required if guardian is not a parent)
              </p>
            </div>
          </div>
          {formData.authorizationLetter && <p className="mt-2 text-sm text-green-600">
              File selected: {formData.authorizationLetter.name}
            </p>}
          {errors.authorizationLetter && <p className="mt-1 text-sm text-red-600">
              {errors.authorizationLetter}
            </p>}
        </div>
      </div>
      <div className="mt-6 border-t border-gray-200 pt-6">
        <div className="flex items-center">
          <input id="guardianDeclaration" name="guardianDeclaration" type="checkbox" checked={formData.guardianDeclaration || false} onChange={handleInputChange} className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded" />
          <label htmlFor="guardianDeclaration" className="ml-2 block text-sm text-gray-700">
            I declare that I am the parent/legal guardian of the minor applicant
            and all information provided is true and correct.
          </label>
        </div>
        {errors.guardianDeclaration && <p className="mt-1 text-sm text-red-600">
            {errors.guardianDeclaration}
          </p>}
      </div>
    </div>;
};
export default MinorApplicationSection;