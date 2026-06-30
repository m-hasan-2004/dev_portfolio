"use client";

import { motion } from "framer-motion";

const timeline = [
  {
    period: "2026 — Present",
    title: "Freelance Developer & Open Source",
    org: "Self-Employed",
    description:
      "Working on open-source projects and self-learning cutting edge technologies. Building and maintaining backend systems with Python and Django.",
    tags: ["Python", "Django", "Open Source", "Self-Learning"],
  },
  {
    period: "Feb 2025 — Feb 2026",
    title: "Python Developer",
    org: "Private Sector, Iran, Qom",
    description:
      "Worked with Elasticsearch, Kibana, MongoDB, Cassandra, LDAP, and other tools. Built and maintained a sophisticated backend system.",
    tags: ["Python", "Elasticsearch", "Kibana", "MongoDB", "Cassandra", "LDAP"],
  },
  {
    period: "Sep 2021 — Sep 2024",
    title: "Writer & Translator",
    org: "Dicardo",
    description:
      "Blog-based content creation. Produced and edited graphical images using Adobe apps and AI tools. Summarized and created content using resources such as YouTube and Pinterest.",
    tags: ["Content Creation", "Adobe", "AI Tools", "Translation"],
  },
  {
    period: "Jun 2023 — Jun 2024",
    title: "Internship — Django / Python",
    org: "Daneshkar",
    description:
      "Completed 300+ hour bootcamp. Learned hard and soft skills including Python, Django, DRF, Docker, Docker Compose. Covered Agile principles, Scrum framework, and more.",
    tags: ["Python", "Django", "DRF", "Docker", "Agile", "Scrum"],
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
