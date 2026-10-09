export const projects = [
  {
    id: 'glowmatch-ai',
    title: 'GlowMatch AI',
    badge: 'AI & GenAI',
    tagline: 'AI-Powered Skincare Recommendation Engine',
    description:
      'An intelligent recommendation system utilizing vector embeddings and semantic search to match users with personalized cosmetic products based on individual skin profiles, concerns, and ingredient safety.',
    technologies: ['Python', 'Streamlit', 'Vector Search', 'Embeddings', 'Generative AI'],
    github: 'https://github.com/sayyedkashaf/GlowMatch-AI',
    featured: true,
    highlights: [
      'Semantic similarity search across multi-dimensional ingredient embeddings',
      'Interactive Streamlit interface with dynamic allergy & sensitivity filters',
      'Natural language product explanations powered by generative AI',
    ],
    category: 'AI / Data',
  },
  {
    id: 'sentinelshield',
    title: 'SentinelShield Web Protection',
    badge: 'Cybersecurity',
    tagline: 'Defensive Web Security & Request Filtering Engine',
    description:
      'A modular Python web protection application implementing real-time request inspection, token bucket rate limiting, anomaly logging, and IP reputation filtering to safeguard web endpoints against abuse.',
    technologies: ['Python', 'Flask', 'Rate Limiting', 'Security Logging', 'Cybersecurity'],
    github: 'https://github.com/sayyedkashaf/SentinelShield-Web-Protection-System',
    featured: true,
    highlights: [
      'Token-bucket rate limiting mechanism to mitigate brute-force attempts',
      'Structured JSON security event logging with severity tagging',
      'Plug-and-play middleware architecture for lightweight web frameworks',
    ],
    category: 'Cybersecurity',
  },
  {
    id: 'threat-intel',
    title: 'Threat Intelligence Aggregator',
    badge: 'Data & Security',
    tagline: 'Automated Indicator of Compromise (IoC) Pipeline',
    description:
      'A security data pipeline for ingesting, parsing, normalizing, and correlating threat intelligence indicators (IPs, hashes, domain feeds) from disparate sources into standardized security intelligence formats.',
    technologies: ['Python', 'Data Processing', 'Threat Intel', 'REST APIs', 'JSON / CSV'],
    github: 'https://github.com/sayyedkashaf/Threat-Intelligence-Aggregator',
    featured: true,
    highlights: [
      'Multi-format ingestion pipeline for disparate external threat feeds',
      'Indicator deduplication and confidence scoring algorithms',
      'Standardized data export ready for SIEM ingestion and analyst triage',
    ],
    category: 'Cybersecurity',
  },
  {
    id: 'leave-management-api',
    title: 'Employee Leave Management API',
    badge: 'Backend API',
    tagline: 'High-Performance RESTful Microservice with FastAPI',
    description:
      'A robust backend service engineered with FastAPI to streamline employee leave tracking, request approval workflows, leave quota balances, and role-based access control with comprehensive schema validation.',
    technologies: ['FastAPI', 'Python', 'REST APIs', 'Pydantic', 'SQL'],
    github: 'https://github.com/sayyedkashaf/fast-api',
    featured: true,
    highlights: [
      'Asynchronous request handlers with automatic interactive OpenAPI / Swagger docs',
      'Strict data validation and typing schemas implemented via Pydantic',
      'Structured SQL relational model for tracking historical balances and audit trails',
    ],
    category: 'Development',
  },
];

export const projectCategories = ['All', 'AI / Data', 'Cybersecurity', 'Development'];
