export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | null;
  email?: boolean;
  phone?: boolean;
  nin?: boolean;
  fileSize?: number; // in MB
  fileTypes?: string[];
}

export interface ValidationRules {
  [key: string]: ValidationRule;
}

export interface ValidationErrors {
  [key: string]: string;
}

export class FormValidator {
  private rules: ValidationRules;

  constructor(rules: ValidationRules) {
    this.rules = rules;
  }

  validate(data: { [key: string]: any }): ValidationErrors {
    const errors: ValidationErrors = {};

    Object.keys(this.rules).forEach(field => {
      const rule = this.rules[field];
      const value = data[field];
      const error = this.validateField(field, value, rule);
      
      if (error) {
        errors[field] = error;
      }
    });

    return errors;
  }

  validateField(field: string, value: any, rule: ValidationRule): string | null {
    // Required validation
    if (rule.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
      return `${this.getFieldLabel(field)} is required`;
    }

    // Skip other validations if value is empty and not required
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      return null;
    }

    // String validations
    if (typeof value === 'string') {
      // Min length
      if (rule.minLength && value.length < rule.minLength) {
        return `${this.getFieldLabel(field)} must be at least ${rule.minLength} characters`;
      }

      // Max length
      if (rule.maxLength && value.length > rule.maxLength) {
        return `${this.getFieldLabel(field)} must not exceed ${rule.maxLength} characters`;
      }

      // Email validation
      if (rule.email && !this.isValidEmail(value)) {
        return `${this.getFieldLabel(field)} must be a valid email address`;
      }

      // Phone validation
      if (rule.phone && !this.isValidPhone(value)) {
        return `${this.getFieldLabel(field)} must be a valid phone number`;
      }

      // NIN validation
      if (rule.nin && !this.isValidNIN(value)) {
        return `${this.getFieldLabel(field)} must be an 11-digit number`;
      }

      // Pattern validation
      if (rule.pattern && !rule.pattern.test(value)) {
        return `${this.getFieldLabel(field)} format is invalid`;
      }
    }

    // File validations
    if (value instanceof File) {
      // File size validation (convert MB to bytes)
      if (rule.fileSize && value.size > rule.fileSize * 1024 * 1024) {
        return `${this.getFieldLabel(field)} must be smaller than ${rule.fileSize}MB`;
      }

      // File type validation
      if (rule.fileTypes && !rule.fileTypes.includes(value.type)) {
        return `${this.getFieldLabel(field)} must be one of: ${rule.fileTypes.join(', ')}`;
      }
    }

    // Custom validation
    if (rule.custom) {
      const customError = rule.custom(value);
      if (customError) {
        return customError;
      }
    }

    return null;
  }

  private getFieldLabel(field: string): string {
    // Convert camelCase to Title Case
    return field
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private isValidPhone(phone: string): boolean {
    // Nigerian phone number validation
    const phoneRegex = /^(\+234|234|0)?[789][01]\d{8}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  }

  private isValidNIN(nin: string): boolean {
    return /^\d{11}$/.test(nin);
  }
}

// Pre-defined validation rule sets
export const commonValidationRules = {
  firstName: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z\s'-]+$/
  },
  surname: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z\s'-]+$/
  },
  middleName: {
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z\s'-]*$/
  },
  email: {
    required: true,
    email: true,
    maxLength: 100
  },
  phone: {
    required: true,
    phone: true
  },
  nin: {
    nin: true
  },
  dateOfBirth: {
    required: true,
    custom: (value: string) => {
      if (!value) return null;
      const date = new Date(value);
      const today = new Date();
      const minDate = new Date(today.getFullYear() - 100, 0, 1);
      
      if (date > today) {
        return 'Date of birth cannot be in the future';
      }
      if (date < minDate) {
        return 'Please enter a valid date of birth';
      }
      return null;
    }
  },
  passport: {
    required: true,
    fileSize: 2, // 2MB
    fileTypes: ['image/jpeg', 'image/jpg', 'image/png']
  },
  ninSlip: {
    fileSize: 2,
    fileTypes: ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf']
  },
  birthCertificate: {
    fileSize: 2,
    fileTypes: ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf']
  },
  guardianId: {
    fileSize: 2,
    fileTypes: ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf']
  },
  authorizationLetter: {
    fileSize: 2,
    fileTypes: ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf']
  }
};

export default FormValidator;
