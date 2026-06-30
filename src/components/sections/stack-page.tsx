"use client";

import { motion } from "framer-motion";

const categories = [
  {
    title: "Backend",
    icon: "⚡",
    description: "Server-side development and APIs",
    skills: [
      { name: "Python", level: 85 },
      { name: "Django", level: 85 },
      { name: "FastAPI", level: 80 },
      { name: "REST API", level: 85 },
    ],
  },
  {
    title: "Databases",
    icon: "🗄️",
    description: "Data storage, search & analytics",
    skills: [
      { name: "MySQL", level: 85 },
      { name: "PostgreSQL", level: 85 },
      { name: "MongoDB", level: 70 },
      { name: "Cassandra", level: 65 },
      { name: "Elasticsearch", level: 50 },
    ],
  },
  {
    title: "DevOps & Security",
    icon: "🚀",
    description: "Infrastructure, deployment & security",
    skills: [
      { name: "Docker", level: 85 },
      { name: "GitLab", level: 85 },
      { name: "Linux", level: 85 },
      { name: "Network+", level: 85 },
      { name: "Security+", level: 85 },
      { name: "CEH", level: 45 },
    ],
  },
  {
    title: "Tools & Languages",
    icon: "🔧",
    description: "Version control, testing & frontend",
    skills: [
      { name: "Git", level: 85 },
      { name: "Kibana", level: 50 },
      { name: "Selenium", level: 55 },
      { name: "C++", level: 40 },
      { name: "HTML & CSS", level: 55 },
      { name: "JavaScript", level: 30 },
    ],
  },
];

const languages = [
  { name: "English", level: "Upper Intermediate" },
];

export function StackPage() {
  return (
    <section className="min-h-screen pt-24 pb-16 px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            The <span className="gradient-text">Stack</span>
          </h1>
          <p className="text-void-muted text-lg mb-12 max-w-2xl">
            Technologies and tools I work with daily to build and ship products.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((cat, catIdx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: catIdx * 0.1 }}
              className="glass rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{cat.icon}</span>
                <div>
                  <h2 className="text-xl font-semibold">{cat.title}</h2>
                  <p className="text-sm text-void-muted">{cat.description}</p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {cat.skills.map((skill, skillIdx) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: catIdx * 0.1 + skillIdx * 0.05 }}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-xs text-void-muted font-mono">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-void-border overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{
                          duration: 1,
                          delay: catIdx * 0.1 + skillIdx * 0.05,
                          ease: "easeOut",
                        }}
                        className="h-full rounded-full bg-gradient-to-r from-accent-purple to-accent-blue"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Languages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 glass rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">🌐</span>
            <div>
              <h2 className="text-xl font-semibold">Languages</h2>
              <p className="text-sm text-void-muted">Communication skills</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {languages.map((lang) => (
              <span
                key={lang.name}
                className="rounded-full bg-accent-purple/10 px-3 py-1 text-sm font-medium text-accent-purple border border-accent-purple/20"
              >
                {lang.name} — {lang.level}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
