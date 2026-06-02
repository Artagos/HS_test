import { prisma } from "../src/lib/prisma";

async function main() {
  const programs = [
    {
      slug: "computer-science",
      title: "Computer Science",
      shortDesc: "Master algorithms, systems, and software engineering.",
      description:
        "A rigorous, industry-aligned Computer Science degree covering algorithms, distributed systems, AI, and modern software engineering practices. Structured in 14 immersive 3-week modules.",
      category: "Technology",
      modules: 14,
      durationWeeks: 42,
      imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
    },
    {
      slug: "data-science",
      title: "Data Science",
      shortDesc: "Turn raw data into actionable intelligence.",
      description:
        "Learn statistical modeling, machine learning, and data engineering. Build production-grade pipelines and deploy models at scale across 14 hands-on modules.",
      category: "Technology",
      modules: 14,
      durationWeeks: 42,
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    },
    {
      slug: "front-end",
      title: "Front-End Development",
      shortDesc: "Craft exceptional user interfaces.",
      description:
        "Deep dive into modern frontend architecture: React, performance, accessibility, design systems, and real-time interfaces. 14 modules of hands-on product building.",
      category: "Technology",
      modules: 14,
      durationWeeks: 42,
      imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
    },
    {
      slug: "interaction-design",
      title: "Interaction Design",
      shortDesc: "Design products people love.",
      description:
        "Human-centered design, prototyping, user research, and systems thinking. Learn to ship products that are intuitive, accessible, and beautiful over 14 intensive modules.",
      category: "Creative",
      modules: 14,
      durationWeeks: 42,
      imageUrl: "https://images.unsplash.com/photo-1586717791821-3f44a5638d48?auto=format&fit=crop&w=800&q=80",
    },
    {
      slug: "high-tech-entrepreneurship",
      title: "High-Tech Entrepreneurship",
      shortDesc: "Build and scale technology ventures.",
      description:
        "From ideation to product-market fit, fundraising, and scaling. Work with real startups and mentors in 14 modules designed for founders.",
      category: "Creative",
      modules: 14,
      durationWeeks: 42,
      imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
    },
  ];

  for (const p of programs) {
    await prisma.program.upsert({
      where: { slug: p.slug },
      update: {},
      create: p,
    });
  }

  console.log("Seeded programs.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
