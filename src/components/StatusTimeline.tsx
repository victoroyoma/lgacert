import React from 'react';
import { Check, Clock, XCircle, FileText, User } from 'lucide-react';

interface StatusTimelineProps {
  currentStatus: 'submitted' | 'under-review' | 'approved' | 'rejected';
  submittedDate?: string;
  reviewStartDate?: string;
  completedDate?: string;
  className?: string;
}

const StatusTimeline: React.FC<StatusTimelineProps> = ({
  currentStatus,
  submittedDate,
  reviewStartDate,
  completedDate,
  className = ''
}) => {
  const statuses = [
    {
      key: 'submitted',
      label: 'Application Submitted',
      icon: FileText,
      description: 'Your application has been received',
      date: submittedDate
    },
    {
      key: 'under-review',
      label: 'Under Review',
      icon: User,
      description: 'Our team is reviewing your application',
      date: reviewStartDate
    },
    {
      key: 'approved',
      label: currentStatus === 'rejected' ? 'Decision Made' : 'Approved',
      icon: currentStatus === 'rejected' ? XCircle : Check,
      description: currentStatus === 'rejected' 
        ? 'Your application has been reviewed' 
        : 'Your certificate is ready for collection',
      date: completedDate
    }
  ];

  const getStatusIndex = () => {
    switch (currentStatus) {
      case 'submitted': return 0;
      case 'under-review': return 1;
      case 'approved': 
      case 'rejected': return 2;
      default: return 0;
    }
  };

  const currentIndex = getStatusIndex();

  const getStatusColor = (index: number) => {
    if (index < currentIndex) return 'text-green-600 bg-green-100 border-green-200';
    if (index === currentIndex) {
      if (currentStatus === 'rejected') {
        return 'text-red-600 bg-red-100 border-red-200';
      }
      return 'text-blue-600 bg-blue-100 border-blue-200';
    }
    return 'text-gray-400 bg-gray-100 border-gray-200';
  };

  const getConnectorColor = (index: number) => {
    if (index < currentIndex) return 'bg-green-400';
    return 'bg-gray-300';
  };

  return (
    <div className={`${className}`}>
      <div className="relative">
        {statuses.map((status, index) => (
          <div key={status.key} className="relative flex items-start">
            {/* Connector line */}
            {index < statuses.length - 1 && (
              <div 
                className={`absolute left-4 top-8 w-0.5 h-16 ${getConnectorColor(index)}`}
              />
            )}
            
            {/* Status item */}
            <div className="flex items-center w-full">
              {/* Icon */}
              <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${getStatusColor(index)} relative z-10`}>
                {index < currentIndex ? (
                  <Check size={16} />
                ) : index === currentIndex && currentStatus === 'rejected' ? (
                  <XCircle size={16} />
                ) : index === currentIndex ? (
                  <Clock size={16} />
                ) : (
                  <status.icon size={16} />
                )}
              </div>
              
              {/* Content */}
              <div className="ml-4 flex-1 pb-8">
                <div className="flex items-center justify-between">
                  <h3 className={`text-sm font-semibold ${
                    index <= currentIndex ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {status.label}
                  </h3>
                  {status.date && (
                    <span className="text-xs text-gray-500">
                      {new Date(status.date).toLocaleDateString()}
                    </span>
                  )}
                </div>
                <p className={`text-sm ${
                  index <= currentIndex ? 'text-gray-600' : 'text-gray-400'
                }`}>
                  {status.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface ApplicationStepsProps {
  currentStep: number;
  totalSteps: number;
  stepTitles: string[];
  className?: string;
}

export const ApplicationSteps: React.FC<ApplicationStepsProps> = ({
  currentStep,
  totalSteps,
  stepTitles,
  className = ''
}) => {
  return (
    <div className={`${className}`}>
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          
          return (
            <React.Fragment key={stepNumber}>
              <div className="flex flex-col items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                  isCompleted 
                    ? 'bg-green-600 border-green-600 text-white'
                    : isCurrent
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'bg-white border-gray-300 text-gray-500'
                }`}>
                  {isCompleted ? (
                    <Check size={16} />
                  ) : (
                    <span className="text-sm font-semibold">{stepNumber}</span>
                  )}
                </div>
                <span className={`mt-2 text-xs font-medium ${
                  isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {stepTitles[index]}
                </span>
              </div>
              
              {index < totalSteps - 1 && (
                <div className={`flex-1 h-0.5 mx-2 ${
                  stepNumber < currentStep ? 'bg-green-600' : 'bg-gray-300'
                }`} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default StatusTimeline;
