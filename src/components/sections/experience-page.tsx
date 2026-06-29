"use client";

import { motion } from "framer-motion";

const timeline = [
  {
    period: "2023 — Present",
    title: "Backend Developer",
    org: "Personal Projects & Open Source",
    description:
      "Building and maintaining multiple backend systems using Python and Django. Designing RESTful APIs, optimizing database queries, and deploying containerized applications.",
    tags: ["Python", "Django", "DRF", "Docker", "PostgreSQL"],
  },
  {
    period: "2023 — 2024",
    title: "Python Development Intern",
    org: "Tech Startup",
    description:
      "Contributed to backend development of a SaaS platform. Built API endpoints, integrated third-party services, and wrote automated tests. Improved system performance by optimizing database queries.",
    tags: ["Python", "Django", "REST API", "MySQL"],
  },
  {
    period: "2023",
    title: "Content Creator & Translator",
    org: "Freelance",
    description:
      "Created technical content and translated documentation for developer communities. Focused on making technical concepts accessible to broader audiences.",
    tags: ["Technical Writing", "Translation", "Documentation"],
  },
  {
    period: "2022 — 2023",
    title: "Django Bootcamp",
    org: "Self-Learning & Community",
    description:
      "Completed intensive Django development training. Built multiple projects including e-commerce platforms, task management systems, and API services.",
    tags: ["Django", "Web Development", "Git"],
  },
];

export function ExperiencePage() {
  return (
    <section className="min-h-screen pt-24 pb-16 px-6">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Experience</span>
          </h1>
          <p className="text-void-muted text-lg mb-12">
            A timeline of my professional journey and growth.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent-purple via-accent-blue to-transparent" />

          <div className="space-y-12">
            {timeline.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className={`relative flex items-start gap-8 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } flex-col md:items-center`}
              >
                {/* Timeline dot */}
                <div className="absolute left-[15px] md:left-1/2 w-3 h-3 rounded-full bg-accent-purple border-2 border-void-bg -translate-x-1/2 mt-2 md:mt-0 z-10" />

                {/* Content */}
                <div className={`flex-1 pl-12 md:pl-0 ${i % 2 === 0 ? "md:text-right" : ""}`}>
                  <div
                    className={`glass rounded-xl p-6 inline-block ${
                      i % 2 === 0 ? "md:ml-auto" : ""
                    } max-w-lg`}
                  >
                    <span className="text-xs font-mono text-accent-purple mb-2 block">
                      {item.period}
                    </span>
                    <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-void-muted mb-3">{item.org}</p>
                    <p className="text-sm text-void-muted/80 mb-4">{item.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-accent-purple/10 px-2.5 py-0.5 text-[11px] font-medium text-accent-purple border border-accent-purple/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
