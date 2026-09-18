// ─────────────────────────────────────────────────────────────
// EDIT THIS FILE to drop in your real info. Nothing else needs
// to change — every component reads from here.
// ─────────────────────────────────────────────────────────────

const content = {
  name: 'Agha Abrar',
  role: 'Full Stack ML Engineer',
  tagline:
    'I build fast, considered interfaces — the kind that feel obvious in hindsight.',
  location: 'Sindh, Pakistan',
  email: 'abrarkhan9226@gmail.com',
  cvPath: '/cv/Agha-Abrar-CV.pdf',
  socials: [
    { label: 'GitHub', url: 'https://github.com/agha-abrar' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/agha-abrar/' },
  ],

  about: {
    paragraphs: [
      "I'm a Full Stack ML Engineer focused on turning AI and machine learning ideas into useful applications. My work brings together data processing, model integration, backend APIs, and clear interfaces — from text classification and resume ranking to AI assistants and automation tools.",
      "I explore natural language processing, retrieval-augmented generation, and AI workflows with tools such as Hugging Face, LangChain, and LangGraph. I care about how these systems behave in practice: the quality of their answers, how they handle data, and whether they make a task easier for the people using them.",
    ],
    facts: [
      { label: 'Based in', value: 'Sindh, Pakistan' },
      { label: 'Focus', value: 'Machine Learning, AI & Automation' },
      { label: 'Currently', value: 'Open to new roles' },
      { label: 'Experience', value: '5+ years' },
    ],
  },

  skills: [
    {
      group: 'Frontend',
      items: [
        'TypeScript',
        'JavaScript',
        'React',
        'Next.js',
        'Tailwind CSS',
        'Responsive UI',
        'Component Architecture',
        'Dashboard Development',
        'API-Driven Interfaces',
        'State Management',
      ],
    },
    {
      group: 'Backend & APIs',
      items: [
        'Node.js',
        'Express.js',
        'Python',
        'FastAPI',
        'Flask',
        'REST APIs',
        'Webhooks',
        'Microservices',
        'API Design',
        'API Integration',
        'Server-Sent Events',
        'WebSockets',
      ],
    },
    {
      group: 'Databases & ORMs',
      items: [
        'MySQL',
        'Prisma',
        'PostgreSQL',
        'Supabase',
        'MongoDB',
        'SQL',
        'Relational Schema Design',
        'Data Modeling',
        'Query Optimization Basics',
      ],
    },
    {
      group: 'Modern TypeScript Stack',
      items: [
        'TypeScript',
        'Tailwind CSS',
        'Prisma',
        'MySQL',
        'tRPC Familiarity',
        'Type-Safe API Patterns',
        'Full-Stack Product Architecture',
        'Reusable Code Practices',
      ],
    },
    {
      group: 'Security & Fintech Basics',
      items: [
        'Secure API Practices',
        'Authentication Concepts',
        'Authorization/RBAC',
        'Input Validation',
        'Data Integrity',
        'Sensitive Data Handling',
        'Audit Logging Basics',
      ],
    },
    {
      group: 'AI & Automation',
      items: [
        'OpenAI API',
        'Hugging Face',
        'Ollama',
        'LangChain',
        'LangGraph',
        'RAG',
        'AI Chatbots',
        'AI Copilots',
        'Prompt Engineering',
        'Custom Backend Automation',
      ],
    },
    {
      group: 'Cloud, DevOps & Tools',
      items: [
        'Docker',
        'Git',
        'GitHub',
        'Vercel',
        'Supabase',
        'AWS/S3 Basics',
        'CI/CD Familiarity',
        'Environment Configuration',
        'Deployment Troubleshooting',
      ],
    },
    {
      group: 'Collaboration',
      items: [
        'Requirements Understanding',
        'Solution Architecture',
        'Product Collaboration',
        'Documentation',
        'Agile Delivery',
        'Code Reviews',
        'Stakeholder Communication',
      ],
    },
  ],

  projects: [
    {
      "title": "MCP GitHub Repo Assistant",
      "description": "Analyzes repository documentation, issues, and pull requests to produce AI-assisted triage, health reports, and a seven-day sprint plan.",
      "tags": [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "GitHub API"
      ],
      "repo": "https://github.com/agha-abrar/mcp-github-repo-assistant"
    },
    {
      "title": "Transparent Auction House",
      "description": "An auction platform with buyer and administrator interfaces, bidding workflows, and a shill-bidding detection module.",
      "tags": [
        "JavaScript",
        "Flask",
        "Python"
      ],
      "repo": "https://github.com/agha-abrar/Transparent-Auction-House-FYP"
    },
    {
      "title": "AI Clinical Decision Support",
      "description": "An educational prototype combining a desktop interface, patient records, medication-safety rules, and an AI gateway. Clinical workflows are still in development; not clinically validated.",
      "tags": [
        "React",
        "TypeScript",
        "NestJS",
        "FastAPI"
      ],
      "repo": "https://github.com/agha-abrar/AI-Powered-Clinical-Decision-Support-System"
    },
    {
      "title": "Resume Ranking",
      "description": "Compares uploaded PDF resumes with a job description using TF-IDF vectors and cosine similarity, then displays ranked results.",
      "tags": [
        "Python",
        "Flask",
        "scikit-learn",
        "NLP"
      ],
      "repo": "https://github.com/agha-abrar/Resume-Ranking"
    },
    {
      "title": "Revenue Dashboard",
      "description": "Tracks ride revenue and profit with a fare calculator, saved ride history, and analytics views backed by CSV data.",
      "tags": [
        "Python",
        "Flask",
        "Pandas"
      ],
      "repo": "https://github.com/agha-abrar/revenue_dashboard"
    },
    {
      "title": "MERN E-commerce",
      "description": "A full-stack storefront with product browsing, shopping carts, wishlists, order management, and administrator screens.",
      "tags": [
        "React",
        "Node.js",
        "JavaScript"
      ],
      "repo": "https://github.com/agha-abrar/mern-ecommerce-main"
    },
    {
      "title": "Digital Image Filters",
      "description": "A web application for image processing, including gamma correction, histogram adjustments, edge detection, and frequency-domain filters.",
      "tags": [
        "Python",
        "Flask",
        "Image Processing"
      ],
      "repo": "https://github.com/agha-abrar/Digital_Image_Filters_and_Transformations"
    },
    {
      "title": "Deep Learning Text Classification",
      "description": "Experiments comparing text encodings and embeddings for deep learning classification, with preprocessing and stratified training and evaluation splits.",
      "tags": [
        "Deep Learning",
        "NLP",
        "Jupyter Notebook"
      ],
      "repo": "https://github.com/agha-abrar/TextClassification_Experiments-Using-Deep-Learning"
    }
  ],

  experience: [
    {
      role: 'Frontend Developer',
      company: 'Company Name',
      period: '2024 — Present',
      description:
        'What you owned, what shipped, and the measurable difference it made.',
    },
    {
      role: 'UI Developer Intern',
      company: 'Company Name',
      period: '2023 — 2024',
      description:
        'What you owned, what shipped, and the measurable difference it made.',
    },
    {
      role: 'Freelance Web Developer',
      company: 'Self-employed',
      period: '2022 — 2023',
      description:
        'What you owned, what shipped, and the measurable difference it made.',
    },
  ],
}

export default content
