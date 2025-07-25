import React from 'react';
interface FormStepProps {
  title: string;
  currentStep: number;
  stepNumber: number;
  children: React.ReactNode;
}
const FormStep: React.FC<FormStepProps> = ({
  title,
  currentStep,
  stepNumber,
  children
}) => {
  if (currentStep !== stepNumber) {
    return null;
  }
  return <div className="animate-fadeIn">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      {children}
    </div>;
};
export default FormStep;