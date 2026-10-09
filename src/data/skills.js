export const skillGroups = [
  {
    title: 'Data & Analysis',
    description:
      'Core analytical stack for data wrangling, querying, and exploratory data analysis.',
    icon: 'Database',
    skills: [
      { name: 'Python', highlight: true },
      { name: 'SQL', highlight: true },
      { name: 'R', highlight: false },
      { name: 'Excel', highlight: false },
      { name: 'Data Cleaning', highlight: true },
      { name: 'Data Analysis', highlight: true },
    ],
  },
  {
    title: 'Visualization & Storytelling',
    description: 'Translating raw figures into actionable executive insights and visual reports.',
    icon: 'BarChart3',
    skills: [
      { name: 'Power BI', highlight: true },
      { name: 'Data Visualization', highlight: true },
      { name: 'Dashboard Design', highlight: false },
      { name: 'Exploratory Charts', highlight: false },
    ],
  },
  {
    title: 'Backend & Development',
    description: 'Architecting modular microservices, REST APIs, and automated tools.',
    icon: 'Server',
    skills: [
      { name: 'FastAPI', highlight: true },
      { name: 'Flask', highlight: false },
      { name: 'REST APIs', highlight: true },
      { name: 'Git / GitHub', highlight: true },
      { name: 'Pydantic', highlight: false },
    ],
  },
  {
    title: 'AI & Intelligent Systems',
    description: 'Hands-on implementations of semantic search, embeddings, and generative AI.',
    icon: 'Cpu',
    skills: [
      { name: 'Generative AI', highlight: true },
      { name: 'Embeddings', highlight: true },
      { name: 'Vector Search', highlight: true },
      { name: 'Machine Learning Fundamentals', highlight: true },
    ],
  },
  {
    title: 'Security & Systems',
    description: 'Defensive web security, indicators of compromise, and script automation.',
    icon: 'ShieldCheck',
    skills: [
      { name: 'Cybersecurity Fundamentals', highlight: true },
      { name: 'Threat Intelligence', highlight: false },
      { name: 'Rate Limiting & Defensive Controls', highlight: false },
      { name: 'VBA Automation', highlight: false },
    ],
  },
];

export const currentFocusList = [
  {
    title: 'Python & Advanced SQL',
    description: 'Mastering complex joins, window functions, and idiomatic Python data pipelines.',
    tag: 'Core Foundation',
  },
  {
    title: 'Data Analysis & Visualization',
    description:
      'Rigorous exploratory data analysis (EDA) and meaningful statistical interpretations.',
    tag: 'Analytics',
  },
  {
    title: 'Machine Learning Fundamentals',
    description: 'Supervised & unsupervised algorithms, feature engineering, and model evaluation.',
    tag: 'ML',
  },
  {
    title: 'AI & GenAI Applications',
    description: 'Semantic search, vector databases, and real-world LLM-assisted workflows.',
    tag: 'Generative AI',
  },
  {
    title: 'Power BI & Data Storytelling',
    description:
      'Building interactive, recruiter-ready dashboards that present business narratives.',
    tag: 'BI & Reporting',
  },
  {
    title: 'Backend & API Engineering',
    description:
      'Designing resilient REST endpoints with FastAPI, request validation, and clean architecture.',
    tag: 'Backend',
  },
  {
    title: 'Cybersecurity & Data Intersection',
    description:
      'Analyzing threat intelligence feeds, anomaly detection, and web security safeguards.',
    tag: 'Security',
  },
];
