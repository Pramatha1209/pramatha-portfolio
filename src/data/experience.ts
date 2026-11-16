export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  type: string;
  period: string;
  year: string;
  summary: string;
  responsibilities: string[];
  skills: string[];
  achievements: string[];
}

export const experienceData: ExperienceItem[] = [
  {
    id: "place-mantra-internship",
    role: "Data Science Intern",
    company: "Place Mantra",
    location: "Remote",
    type: "Internship",
    period: "2024",
    year: "2024",
    summary:
      "Spearheaded data analytics workflows, exploratory data investigations, and KPI dashboard architecture utilizing Python, SQL, and Power BI to empower executive business decision-making.",
    responsibilities: [
      "Performed data cleaning, exploratory data analysis (EDA), and statistical analysis using Python and SQL to identify core operational trends and generate actionable business insights.",
      "Developed analytical workflows and interactive Power BI dashboards for KPI tracking, performance analysis, and recurring business reporting.",
      "Engineered automated SQL queries and data validation pipelines to ensure data integrity across cross-functional datasets.",
      "Translated raw business telemetry into strategic data visualizations, presenting findings to senior stakeholders.",
    ],
    skills: [
      "Python",
      "SQL",
      "Power BI",
      "DAX",
      "Exploratory Data Analysis",
      "Statistical Analysis",
      "KPI Dashboards",
      "Business Reporting",
    ],
    achievements: [
      "Constructed multi-page executive dashboards delivering real-time performance metrics.",
      "Enhanced report generation speed by automating manual data processing steps in Python.",
      "Received Data Science Internship Completion Certificate for exemplary analytical contributions.",
    ],
  },
];
