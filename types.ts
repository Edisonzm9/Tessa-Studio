
export interface FormData {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  industry: string;
  employees: string;
  budget: string;
  techMaturity: string;
  challenges: string;
  features: string[];
}

export interface SoftwareRecommendation {
  name: string;
  description: string;
  estimated_cost: string;
}

export interface SolutionsReportData {
  analysis_summary: string;
  recommendation_type: 'EXISTING_SOFTWARE' | 'CUSTOM_SOLUTION';
  recommendations: SoftwareRecommendation[];
  custom_solution_rationale: string;
}
