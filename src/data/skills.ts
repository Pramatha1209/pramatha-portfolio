export interface SkillCategory {
  category: string;
  description: string;
  icon: string;
  skills: {
    name: string;
    level: string; // "Advanced", "Proficient", "Familiar"
    badge?: string;
    highlight?: boolean;
  }[];
}

export const skillsData: SkillCategory[] = [
  {
    category: "Programming & Data",
    description: "Core statistical computing, database querying, and high-performance data manipulation pipelines.",
    icon: "Code2",
    skills: [
      { name: "Python", level: "Advanced", highlight: true, badge: "Primary" },
      { name: "SQL", level: "Advanced", highlight: true, badge: "Primary" },
      { name: "MySQL", level: "Proficient" },
      { name: "PostgreSQL", level: "Proficient" },
      { name: "Pandas", level: "Advanced", highlight: true },
      { name: "NumPy", level: "Advanced", highlight: true },
      { name: "R", level: "Proficient" },
    ],
  },
  {
    category: "Analytics & Business Intelligence",
    description: "Transforming complex datasets into executive dashboards, statistical insights, and operational KPIs.",
    icon: "BarChart3",
    skills: [
      { name: "Power BI", level: "Advanced", highlight: true, badge: "Primary" },
      { name: "DAX", level: "Advanced", highlight: true },
      { name: "Power Query", level: "Advanced" },
      { name: "Excel (Advanced)", level: "Advanced" },
      { name: "Tableau", level: "Proficient" },
      { name: "Exploratory Data Analysis (EDA)", level: "Advanced", highlight: true },
      { name: "Statistical Analysis", level: "Advanced", highlight: true },
      { name: "Data Visualization", level: "Advanced" },
    ],
  },
  {
    category: "Machine Learning & AI",
    description: "Designing end-to-end predictive modeling systems, feature pipelines, and statistical estimators.",
    icon: "BrainCircuit",
    skills: [
      { name: "Scikit-learn", level: "Advanced", highlight: true, badge: "Primary" },
      { name: "Regression Analysis", level: "Advanced" },
      { name: "Classification", level: "Advanced" },
      { name: "Random Forest", level: "Advanced", highlight: true },
      { name: "Feature Engineering", level: "Advanced", highlight: true },
      { name: "Predictive Modeling", level: "Advanced" },
      { name: "Model Evaluation & Tuning", level: "Proficient" },
    ],
  },
  {
    category: "Development & APIs",
    description: "Architecting responsive user interfaces, backend REST endpoints, and cross-platform apps.",
    icon: "Layers",
    skills: [
      { name: "Flask", level: "Proficient", highlight: true },
      { name: "REST APIs", level: "Proficient", highlight: true },
      { name: "HTML5 & CSS3", level: "Advanced" },
      { name: "JavaScript", level: "Proficient" },
      { name: "Flutter", level: "Proficient" },
      { name: "Responsive Web Design", level: "Advanced" },
    ],
  },
  {
    category: "Tools, Cloud & Platforms",
    description: "Modern developer workflows, version control, distributed data environments, and cloud infrastructure.",
    icon: "Terminal",
    skills: [
      { name: "Git", level: "Advanced" },
      { name: "GitHub", level: "Advanced", highlight: true },
      { name: "Jupyter Notebooks", level: "Advanced" },
      { name: "Google Colab", level: "Advanced" },
      { name: "Databricks", level: "Proficient" },
      { name: "AWS Basics", level: "Familiar" },
      { name: "Google Analytics", level: "Proficient" },
    ],
  },
];
