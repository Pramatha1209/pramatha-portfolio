export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  image: string;
  imageFit?: "cover" | "contain";
  imagePosition?: string;
  featured: boolean;
  year: string;
  metrics?: { label: string; value: string }[];
  caseStudy?: {
    overview: string;
    challenge: string;
    solution: string;
    architecture: string[];
    outcomes: string[];
  };
}

export const projectsData: Project[] = [
  {
    id: "shantha-residency",
    number: "01",
    title: "Shantha Residency",
    subtitle: "Hotel Website & Digital Platform",
    description:
      "Designed and developed a production-ready luxury hotel platform featuring room listings, interactive photography galleries, restaurant menu, location details, and an enquiry-first WhatsApp booking workflow directly connected to the lodge desk.",
    category: "Web & Digital Platform",
    technologies: ["Next.js", "TypeScript", "React", "Tailwind CSS", "WhatsApp Integration"],
    liveUrl: "https://www.shantharesidency.com/",
    image: "/images/projects/banner-shantha.jpg",
    featured: true,
    year: "2026",
    metrics: [
      { label: "Direct Bookings", value: "WhatsApp First" },
      { label: "Concierge Routing", value: "Direct Desk" },
      { label: "Responsive", value: "100% Mobile" },
    ],
    caseStudy: {
      overview:
        "Shantha Residency is a premier hospitality destination in Sagara, Karnataka, requiring a bespoke, high-performance digital presence to replace third-party booking friction with direct concierge communication.",
      challenge:
        "Traditional hotel booking portals introduce third-party commission cuts and slow confirmation times for travelers seeking prompt stay arrangements.",
      solution:
        "Engineered a fluid Next.js web application with genuine property photography, modern typography, optimized asset loading, and direct WhatsApp & telephone click-to-chat routing.",
      architecture: [
        "Next.js App Router for server-rendered speed and SEO indexability",
        "Tailwind CSS for bespoke, ultra-responsive luxury hospitality design",
        "Direct API routing for WhatsApp click-to-chat with pre-filled room parameters",
        "High-performance responsive image pipeline for crystal-clear retina displays",
      ],
      outcomes: [
        "Eliminated intermediary commissions through direct lodge desk dispatch",
        "Instant room availability inquiries with zero friction",
        "Sub-second page load speeds on mobile networks",
      ],
    },
  },
  {
    id: "aula-experience",
    number: "02",
    title: "Aula Product Experience",
    subtitle: "Interactive Digital Platform",
    description:
      "A next-generation interactive product experience showcasing the AULA F3287 mechanical gaming keyboard with fluid 360-degree interactive product rotations, custom typography, and tactile keycap lighting demonstrations.",
    category: "Interactive Product Showcase",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    liveUrl: "https://aula-f3287-product-experience-4c4n.vercel.app/",
    githubUrl: "https://github.com/Pramatha1209/aula-f3287-product-experience",
    image: "/images/projects/banner-aula.jpg",
    featured: true,
    year: "2025",
    metrics: [
      { label: "Deployment", value: "Vercel Live" },
      { label: "Hardware Labs", value: "AULA F3287" },
      { label: "Interactions", value: "3D Motion" },
    ],
    caseStudy: {
      overview:
        "A cinematic, hardware-focused interactive product showcase engineered to communicate the tactile depth and engineering precision of the AULA F3287 mechanical gaming keyboard.",
      challenge:
        "Capturing the physical sensation of mechanical keyboard switches, customizable backlighting, and structural ergonomics within a browser viewport.",
      solution:
        "Engineered an interactive 3D rotation frame sequence, dark atmospheric lighting, and fluid micro-interactions built with Next.js and TypeScript.",
      architecture: [
        "Sequential hardware frame sequencing for seamless 360-degree rotation",
        "Modular React components designed for reusable layout choreography",
        "Hardware-accelerated CSS transforms and keyframe timing",
        "Strict TypeScript typing across data models and event handlers",
      ],
      outcomes: [
        "Deployed live on Vercel with instant edge caching and global delivery",
        "Smooth 60 FPS interactions across mobile and desktop devices",
      ],
    },
  },
  {
    id: "boat-nirvanaa",
    number: "03",
    title: "boAt Nirvanaa Eutopia",
    subtitle: "Immersive Audio Experience UI",
    description:
      "Interactive audio product showcase and visual identity web experience for boAt Nirvanaa Eutopia spatial audio headphones, featuring 360-degree product renders, dynamic acoustic frequency highlights, and tactile product controls.",
    category: "Creative Engineering & Audio UI",
    technologies: ["React", "Next.js", "Motion Design", "Spatial Audio", "Product Showcase"],
    githubUrl: "https://github.com/Pramatha1209/boat-nirvanaa-eutopia",
    image: "/images/projects/banner-boat.jpg",
    imageFit: "cover",
    imagePosition: "object-center",
    featured: true,
    year: "2025",
    metrics: [
      { label: "Focus", value: "Acoustic Motion" },
      { label: "Source Code", value: "Open on GitHub" },
      { label: "UI Theme", value: "Cinematic Dark" },
    ],
    caseStudy: {
      overview:
        "A premium product showcase engineered to translate acoustic depth, head-tracking spatial audio, and active noise cancellation into an engaging digital encounter.",
      challenge:
        "Communicating intangible audio sensations through a visual browser interface without relying on generic static banners.",
      solution:
        "Combined cinematic typography, dynamic soundwave simulations, and dark luxury aesthetics to produce a tactile, high-engagement consumer experience.",
      architecture: [
        "React component architecture with fluid micro-interactions",
        "Tailwind CSS custom dark palette with neon acoustic frequency accents",
        "Scroll-driven feature revelations highlighting 3D spatial sound and battery longevity",
      ],
      outcomes: [
        "Sleek modern user interface receiving high praise for aesthetic fidelity",
        "Clean, open-source codebase available for review on GitHub",
      ],
    },
  },
  {
    id: "blinkit-analytics",
    number: "04",
    title: "Blinkit Delivery Intelligence",
    subtitle: "Operations & Fulfillment Analytics",
    description:
      "Deep operational analytics of 2,900+ delivery records evaluating the correlation between weather disruptions, traffic severity, travel distance, delivery latency, and rider efficiency. Built an interactive Power BI dashboard with complex DAX measures and SQL-derived insights.",
    category: "Data Analytics & BI",
    technologies: ["SQL", "Python", "Excel", "Power BI", "DAX"],
    image: "/images/projects/banner-blinkit.jpg",
    featured: true,
    year: "2026",
    metrics: [
      { label: "Records Analyzed", value: "2,900+" },
      { label: "Latency Factors", value: "Traffic & Weather" },
      { label: "Efficiency Gain", value: "18% Fleet Boost" },
    ],
    caseStudy: {
      overview:
        "Quick-commerce delivery guarantees depend on micro-second fulfillment precision. This case study analyzes 2,900+ delivery records to uncover root causes of delivery SLA violations.",
      challenge:
        "Unpredictable urban congestion, sudden monsoon downpours, and suboptimal rider dispatch radii frequently degrade 10-minute delivery promises.",
      solution:
        "Constructed an end-to-end data pipeline: cleaned and aggregated transactional data in Python & SQL, modeled operational metrics with custom DAX in Power BI, and isolated the key variables impacting dispatch velocity.",
      architecture: [
        "Python (Pandas, NumPy) for outlier detection, datetime parsing, and statistical cleaning",
        "Relational SQL queries utilizing window functions, aggregations, and CTEs",
        "Power BI Star-Schema data model with dynamic DAX measures for SLA tracking",
        "Multivariate regression correlation between rainfall volume, traffic density, and delivery duration",
      ],
      outcomes: [
        "Identified heavy rain as causing an average +34% spike in delivery latency in high-density corridors",
        "Established an optimal dispatch radius threshold of < 3.2 km to preserve sub-15 minute SLAs",
        "Recommended zoned fleet staging, projecting an 18% improvement in courier turnaround efficiency",
      ],
    },
  },
  {
    id: "bengaluru-house-price",
    number: "05",
    title: "Bengaluru House Price Prediction",
    subtitle: "Machine Learning Regression Engine",
    description:
      "End-to-end machine learning system developed with Pandas, NumPy, Scikit-learn, and Flask. Features rigorous exploratory data analysis, outlier remediation, categorical dimensionality reduction, and Random Forest / Gradient Boosting regression algorithms.",
    category: "Machine Learning & AI",
    technologies: ["Python", "Pandas", "NumPy", "Scikit-learn", "Flask"],
    githubUrl: "https://github.com/Pramatha1209/bengaluru-house-price-predictor",
    image: "/images/projects/banner-bengaluru-house.jpg",
    featured: true,
    year: "2026",
    metrics: [
      { label: "Algorithms", value: "Random Forest & GB" },
      { label: "Model Metric", value: "R² > 0.86" },
      { label: "Deployment", value: "Flask REST API" },
    ],
    caseStudy: {
      overview:
        "Real estate valuation in rapidly expanding metropolitan hubs like Bengaluru suffers from heavy speculation, volatile square-foot metrics, and unstructured localized variance.",
      challenge:
        "Datasets contain extreme noise: inconsistent bedroom-to-area proportions, hundreds of sparse location categories, and severe right-skewed pricing distributions.",
      solution:
        "Engineered an automated preprocessing pipeline eliminating physical anomalies (< 300 sqft/BHK), grouping locations with low sample frequency into 'Other', and training cross-validated ensemble models exposed via a Flask API.",
      architecture: [
        "Feature Engineering: Price per square foot computation, IQR outlier filtering, One-Hot Encoding",
        "Model Selection: K-Fold Cross Validation comparing Linear Regression, Lasso, Decision Trees, and Random Forest",
        "Hyperparameter Tuning: GridSearchCV for optimal estimator depth and split criteria",
        "Flask Micro-service: Lightweight inference endpoint returning instant valuation predictions",
      ],
      outcomes: [
        "Achieved predictive accuracy with R² score exceeding 0.86 across diverse city zones",
        "Reduced dimensionality of 1,000+ localized area names into stable predictive vectors",
        "Created an accessible web interface for instantaneous price estimations based on BHK, bath, and area",
      ],
    },
  },
];
