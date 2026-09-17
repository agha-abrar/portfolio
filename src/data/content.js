// ─────────────────────────────────────────────────────────────
// EDIT THIS FILE to drop in your real info. Nothing else needs
// to change — every component reads from here.
// ─────────────────────────────────────────────────────────────

const content = {
  name: 'Agha Abrar',
  role: 'Frontend Developer & UI Engineer',
  tagline:
    'I build fast, considered interfaces — the kind that feel obvious in hindsight.',
  location: 'Sindh, Pakistan',
  email: 'hello@example.com',
  cvPath: '/cv/Agha-Abrar-CV.pdf', // replace this file in /public/cv
  socials: [
    { label: 'GitHub', url: 'https://github.com/agha-abrar' },
    { label: 'LinkedIn', url: 'https://linkedin.com/in/yourusername' },
    { label: 'Twitter', url: 'https://twitter.com/yourusername' },
  ],

  about: {
    paragraphs: [
      "I'm a developer who cares as much about how software feels as how it works. My background spans building interfaces end to end — from component architecture to the small motion details that make a product feel alive.",
      "Outside of client work, I spend time exploring type systems, generative design, and reading about the history of graphic design — most of which quietly ends up in my UI decisions.",
    ],
    facts: [
      { label: 'Based in', value: 'Sindh, Pakistan' },
      { label: 'Focus', value: 'React, Design Systems, Motion' },
      { label: 'Currently', value: 'Open to new roles' },
      { label: 'Experience', value: '3+ years' },
    ],
  },

  skills: [
    {
      group: 'Languages',
      items: ['JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'Python'],
    },
    {
      group: 'Frameworks & Libraries',
      items: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'Redux'],
    },
    {
      group: 'Tools & Platforms',
      items: ['Git', 'Figma', 'Vite', 'Vercel', 'Node.js'],
    },
    {
      group: 'Practices',
      items: ['Responsive Design', 'Accessibility', 'Design Systems', 'Testing'],
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
