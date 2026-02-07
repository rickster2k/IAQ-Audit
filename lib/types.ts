







export interface Option {
  label: string;
  value: string;
  flag?: 'red' | 'yellow' | 'green'; // For simple internal scoring logic
}

export interface Question {
  id: string;
  text: string;
  category: string;
  options?: Option[]; // Optional for text input questions
  type?: 'choice' | 'text'; // New: identifies the input UI
  maxLength?: number; // New: for text inputs
  placeholder?: string; // New: for text inputs
  conditionalOn?: {
    questionId: string;
    value: string | string[]; // Can trigger on one or multiple values
  };
}

export interface UserResponse {
  questionId: string;
  answerValue: string;
  questionText: string;
  answerLabel: string;
}

export interface ContactInfo {
  firstName: string;
  lastName: string;
  email: string;
  zipCode: string;
  country: string;
}

export interface AssessmentResult {
  score: number;
  summary: string;
  recommendations: string[];
  riskLevel: 'Low' | 'Moderate' | 'High' | 'Severe';
}



export interface PartnerProfile {
  id: string;
  slug: string;
  companyName: string;
  email: string;
  password: string;
  logoData: string;
  createdAt: string;
}


/*Storaded in firestore  */

// Collection: globalStats
export interface GlobalStats {
  visits: number;
  starts: number;
  reports: number;
  avgScore: number;
  announcement: Announcement; // Fixed the syntax here
  shop: Shop;
}

// Collection: helpdesk
export interface SupportSubmission {
  id: string;
  timestamp: string;
  name: string;
  email: string;
  phone?: string;
  reportId?: string;
  subject: string;
  message: string;
}

// Collection: audits
export interface Submission {
  id: string;
  reportId: string; // New: 10-14 character alphanumeric ID
  timestamp: string; // ISO Date string
  contact: ContactInfo;
  result: AssessmentResult;
  responses: UserResponse[];
  referredBy: string | null; // ID of the submission that referred this one
  premiumDoc?: {
    name: string;
    data: string; // base64 encoded string
  };
}


/* 
Saved in another collection
*/
export interface Shop{
  paymentUrl: string;
  pricePoint: number;
}
export interface Announcement {
  text: string;
  url: string;
}