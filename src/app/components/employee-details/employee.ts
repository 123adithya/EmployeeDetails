export interface Employee {
    name:        string;
    role:        string;
    image?:       string;
    rating?:      number;
    experience?:  string;
    joiningDate?: string;
    team?:        string;
    manager?:     string;
    phone:       string;
    email:       string;
    location?: string;
  }

  export interface Validation {
    type: string
    value: RegExp
    message: string
  }

  export const ValidationRules = {
    name: [
      { type: 'required', value: /^[A-Za-z\s]+$/, message: 'Name is required' }
    ],
    companyName: [
      { type: 'required', value: /^[A-Za-z\s]+$/, message: 'Company Name is required' },
    ],
    email: [
      { type: 'required', value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message: 'Email is required' },
      { type: 'regex', value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message: 'Invalid email format' },
    ],
    contactNumber: [
      { type: 'required', value: /^[0-9]{10}$/, message: 'Contact Number is required' },
      { type: 'regex', value: /^[0-9]{10}$/, message: 'Contact Number must be 10 digits' },
    ],
    designation: [
      { type: 'required', value: /^[A-Za-z\s]+$/, message: 'Designation is required' },
    ],
  };

  export  const designation: string []=  ['Software Developer', 'Senior Software Developer', 'Quality Assurance', 'Technical Lead Manager']