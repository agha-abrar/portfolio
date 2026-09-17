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
    { label: 'GitHub', url: 'https://github.com/yourusername' },
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
      title: 'Project One',
      description:
        'A short, concrete description of the problem this project solved and the part you owned.',
      tags: ['React', 'Node.js', 'MongoDB'],
      link: '#',
      repo: '#',
    },
    {
      title: 'Project Two',
      description:
        'A short, concrete description of the problem this project solved and the part you owned.',
      tags: ['Next.js', 'Tailwind', 'Stripe'],
      link: '#',
      repo: '#',
    },
    {
      title: 'Project Three',
      description:
        'A short, concrete description of the problem this project solved and the part you owned.',
      tags: ['TypeScript', 'Framer Motion'],
      link: '#',
      repo: '#',
    },
    {
      title: 'Project Four',
      description:
        'A short, concrete description of the problem this project solved and the part you owned.',
      tags: ['React Native', 'Firebase'],
      link: '#',
      repo: '#',
    },
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
