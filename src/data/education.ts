export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  shortInstitution: string;
  location: string;
  period: string;
  year: string;
  description: string;
  coursework: string[];
  highlights: string[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  credentialUrl?: string;
  skills: string[];
  description: string;
}

export const educationData: EducationItem[] = [
  {
    id: "nmit-be",
    degree: "B.E. in Electronics & Communication Engineering",
    institution: "Nitte Meenakshi Institute of Technology (NMIT)",
    shortInstitution: "NMIT Bengaluru",
    location: "Bengaluru, India",
    period: "2022 – 2026",
    year: "2022–2026",
    description:
      "Engineering degree focused on foundational computational theory, algorithmic problem solving, signal processing, and data infrastructure.",
    coursework: [
      "Database Management Systems (DBMS)",
      "Data Structures & Algorithms (DSA)",
      "Statistics & Probability",
      "Microcontrollers & Embedded Systems",
      "Digital Signal Processing",
    ],
    highlights: [
      "Deep focus on mathematical statistics, relational databases, and computational algorithms.",
      "Bridged hardware fundamentals with high-level software and predictive data systems.",
    ],
  },
];

export const certificationsData: CertificationItem[] = [
  {
    id: "udemy-python-ml",
    title: "Python for Data Analytics and Machine Learning Bootcamp",
    issuer: "Udemy",
    year: "2025",
    skills: ["Python", "Pandas", "NumPy", "Scikit-learn", "Matplotlib", "Seaborn", "Machine Learning"],
    description:
      "Comprehensive mastery of full-stack data analytics and predictive modeling pipelines, covering exploratory data analysis, data cleaning, regression, classification, and statistical evaluation.",
  },
  {
    id: "place-mantra-cert",
    title: "Data Science Internship Completion Certificate",
    issuer: "Place Mantra",
    year: "2024",
    skills: ["Data Cleaning", "EDA", "SQL Querying", "Power BI", "KPI Dashboards", "Statistical Reporting"],
    description:
      "Credential awarded upon successful completion of data science internship responsibilities involving real-world operational datasets, business intelligence, and executive KPI reporting.",
  },
  {
    id: "cisco-entrepreneurship",
    title: "Discovering Entrepreneurship",
    issuer: "Cisco Networking Academy",
    year: "2024",
    skills: ["Strategic Thinking", "Product Ideation", "Operational Planning", "Market Analysis"],
    description:
      "Foundational certification in commercializing technological innovations, understanding customer discovery, business model design, and strategic execution.",
  },
];
