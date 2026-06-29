"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const categories = [
  {
    title: "Backend",
    icon: "⚡",
    description: "Building robust server-side systems",
    skills: [
      { name: "Python", level: 95 },
      { name: "Django", level: 90 },
      { name: "Django REST Framework", level: 88 },
      { name: "FastAPI", level: 80 },
      { name: "Celery", level: 75 },
      { name: "REST APIs", level: 92 },
    ],
  },
  {
    title: "Databases",
    icon: "🗄️",
    description: "Data storage and management",
    skills: [
      { name: "PostgreSQL", level: 88 },
      { name: "MySQL", level: 82 },
      { name: "SQLite", level: 85 },
      { name: "Redis", level: 70 },
    ],
  },
  {
    title: "DevOps",
    icon: "🚀",
    description: "Deployment and infrastructure",
    skills: [
      { name: "Docker", level: 80 },
      { name: "Linux", level: 88 },
      { name: "Nginx", level: 72 },
      { name: "CI/CD", level: 75 },
    ],
  },
  {
    title: "Tools",
    icon: "🔧",
    description: "Development tools and workflows",
    skills: [
      { name: "Git", level: 92 },
      { name: "GitHub", level: 90 },
      { name: "VS Code", level: 95 },
      { name: "Selenium", level: 78 },
      { name: "Postman", level: 85 },
    ],
  },
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
      </div>
    </section>
  );
}
