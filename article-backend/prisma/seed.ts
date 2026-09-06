import { prisma } from "../src/config/db";
import * as bcrypt from "bcrypt";

/**
 * Seed script to populate initial dummy user and articles.
 */
async function main() {
  console.log("🌱 Starting database seeding...");

  // Ensure dummy author user exists
  const dummyEmail = "author@example.com";
  let user = await prisma.users.findUnique({
    where: { email: dummyEmail },
  });

  if (!user) {
    const hashedPassword = await bcrypt.hash("Password123!", 10);
    user = await prisma.users.create({
      data: {
        name: "Alex Rivera",
        email: dummyEmail,
        password: hashedPassword,
      },
    });
    console.log(`👤 Created dummy user: ${user.email} (ID: ${user.id})`);
  } else {
    console.log(`👤 Found existing dummy user: ${user.email} (ID: ${user.id})`);
  }

  // Sample data topics for realistic articles
  const articleTemplates = [
    {
      title: "Mastering TypeScript in 2026: Design Patterns and Idioms",
      description: "Explore essential TypeScript patterns that enhance type safety and code readability in large-scale modern applications.",
      imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=60",
    },
    {
      title: "Building Resilient Distributed Systems with Microservices",
      description: "A practical guide to fault tolerance, circuit breakers, and event-driven architecture in distributed backend systems.",
      imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=60",
    },
    {
      title: "Understanding Cursor-Based vs Offset Pagination",
      description: "Deep dive into database index scans, stability guarantees, and why cursor pagination scales better for high-traffic apps.",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60",
    },
    {
      title: "Modern Database Optimization Strategies with MariaDB and MySQL",
      description: "Techniques for composite indexing, EXPLAIN plan analysis, and query tuning to achieve sub-millisecond response times.",
      imageUrl: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&auto=format&fit=crop&q=60",
    },
    {
      title: "Clean Architecture Principles in Express and Node.js",
      description: "Organizing your backend codebase into distinct presentation, domain, and data layers to maximize testability and maintainability.",
      imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop&q=60",
    },
  ];

  // Generate 25 dummy articles
  const articlesToCreate = [];

  for (let i = 1; i <= 25; i++) {
    const template = articleTemplates[(i - 1) % articleTemplates.length];
    const paddedIndex = String(i).padStart(2, "0");
    const createdAt = new Date(Date.now() - (26 - i) * 3600 * 1000); // Varied chronological timestamps

    articlesToCreate.push({
      title: `${template.title} #${paddedIndex}`,
      description: template.description,
      content: `# ${template.title} #${paddedIndex}\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\n## Key Takeaways\n\n- Scalability through simplicity.\n- Consistent state management and clean separation of concerns.\n- Rigorous testing and observability.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
      imageUrl: template.imageUrl,
      user_id: user.id,
      created_at: createdAt,
    });
  }

  // Insert articles sequentially or in batch to ensure predictable auto-increment IDs
  for (const articleData of articlesToCreate) {
    await prisma.articles.create({
      data: articleData,
    });
  }

  console.log(`✅ Successfully seeded 25 articles linked to user ID ${user.id}`);
}

main()
  .catch((error) => {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
