export interface Program {
  slug: string;
  title: string;
  category: "Technology" | "Creative";
  description: string;
  modules: Module[];
  image: string;
}

export interface Module {
  number: number;
  title: string;
  weeks: number;
}

export const programs: Program[] = [
  {
    slug: "computer-science",
    title: "Computer Science",
    category: "Technology",
    description:
      "A rigorous, industry-driven curriculum covering algorithms, systems, and software engineering across 14 immersive modules.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
    modules: [
      { number: 1, title: "Programming Fundamentals", weeks: 3 },
      { number: 2, title: "Data Structures", weeks: 3 },
      { number: 3, title: "Algorithms", weeks: 3 },
      { number: 4, title: "Computer Systems", weeks: 3 },
      { number: 5, title: "Databases", weeks: 3 },
      { number: 6, title: "Networks", weeks: 3 },
      { number: 7, title: "Software Engineering", weeks: 3 },
      { number: 8, title: "Operating Systems", weeks: 3 },
      { number: 9, title: "Distributed Systems", weeks: 3 },
      { number: 10, title: "Machine Learning", weeks: 3 },
      { number: 11, title: "Security", weeks: 3 },
      { number: 12, title: "Compilers", weeks: 3 },
      { number: 13, title: "Capstone Prep", weeks: 3 },
      { number: 14, title: "Capstone & Launch", weeks: 3 },
    ],
  },
  {
    slug: "data-science",
    title: "Data Science",
    category: "Technology",
    description:
      "Transform raw data into actionable insight. Statistical modeling, deep learning, and real-world analytics pipelines.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    modules: [
      { number: 1, title: "Python & Math", weeks: 3 },
      { number: 2, title: "Statistics", weeks: 3 },
      { number: 3, title: "Data Wrangling", weeks: 3 },
      { number: 4, title: "Visualization", weeks: 3 },
      { number: 5, title: "Machine Learning I", weeks: 3 },
      { number: 6, title: "Machine Learning II", weeks: 3 },
      { number: 7, title: "Deep Learning", weeks: 3 },
      { number: 8, title: "NLP", weeks: 3 },
      { number: 9, title: "Big Data", weeks: 3 },
      { number: 10, title: "MLOps", weeks: 3 },
      { number: 11, title: "Ethics & Bias", weeks: 3 },
      { number: 12, title: "Experimentation", weeks: 3 },
      { number: 13, title: "Capstone Prep", weeks: 3 },
      { number: 14, title: "Capstone & Launch", weeks: 3 },
    ],
  },
  {
    slug: "front-end",
    title: "Front-End Development",
    category: "Technology",
    description:
      "Craft exceptional user interfaces. Design systems, accessibility, performance, and modern frameworks.",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
    modules: [
      { number: 1, title: "HTML, CSS & JS", weeks: 3 },
      { number: 2, title: "React Fundamentals", weeks: 3 },
      { number: 3, title: "State Management", weeks: 3 },
      { number: 4, title: "Design Systems", weeks: 3 },
      { number: 5, title: "Accessibility", weeks: 3 },
      { number: 6, title: "Performance", weeks: 3 },
      { number: 7, title: "Testing", weeks: 3 },
      { number: 8, title: "TypeScript", weeks: 3 },
      { number: 9, title: "SSR & SSG", weeks: 3 },
      { number: 10, title: "Animation", weeks: 3 },
      { number: 11, title: "Mobile & PWA", weeks: 3 },
      { number: 12, title: "Tooling", weeks: 3 },
      { number: 13, title: "Capstone Prep", weeks: 3 },
      { number: 14, title: "Capstone & Launch", weeks: 3 },
    ],
  },
  {
    slug: "interaction-design",
    title: "Interaction Design",
    category: "Creative",
    description:
      "Design products people love. User research, prototyping, and systems thinking for digital experiences.",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a5638d48?auto=format&fit=crop&w=800&q=80",
    modules: [
      { number: 1, title: "Design Thinking", weeks: 3 },
      { number: 2, title: "User Research", weeks: 3 },
      { number: 3, title: "Information Architecture", weeks: 3 },
      { number: 4, title: "Wireframing", weeks: 3 },
      { number: 5, title: "Prototyping", weeks: 3 },
      { number: 6, title: "Visual Design", weeks: 3 },
      { number: 7, title: "Design Systems", weeks: 3 },
      { number: 8, title: "Motion Design", weeks: 3 },
      { number: 9, title: "Service Design", weeks: 3 },
      { number: 10, title: "UX Writing", weeks: 3 },
      { number: 11, title: "Ethics & Inclusion", weeks: 3 },
      { number: 12, title: "Strategy", weeks: 3 },
      { number: 13, title: "Capstone Prep", weeks: 3 },
      { number: 14, title: "Capstone & Launch", weeks: 3 },
    ],
  },
  {
    slug: "high-tech-entrepreneurship",
    title: "High-Tech Entrepreneurship",
    category: "Creative",
    description:
      "Build and scale technology ventures. Lean startup, growth engineering, and venture financing.",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80",
    modules: [
      { number: 1, title: "Entrepreneurial Mindset", weeks: 3 },
      { number: 2, title: "Problem Discovery", weeks: 3 },
      { number: 3, title: "Lean Canvas", weeks: 3 },
      { number: 4, title: "MVPs", weeks: 3 },
      { number: 5, title: "Growth Marketing", weeks: 3 },
      { number: 6, title: "Sales & B2B", weeks: 3 },
      { number: 7, title: "Product Management", weeks: 3 },
      { number: 8, title: "Finance & Metrics", weeks: 3 },
      { number: 9, title: "Fundraising", weeks: 3 },
      { number: 10, title: "Legal & IP", weeks: 3 },
      { number: 11, title: "Team & Culture", weeks: 3 },
      { number: 12, title: "Global Expansion", weeks: 3 },
      { number: 13, title: "Capstone Prep", weeks: 3 },
      { number: 14, title: "Capstone & Launch", weeks: 3 },
    ],
  },
];
