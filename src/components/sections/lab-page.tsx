"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, ExternalLink, Clock, Code2, RefreshCw } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getCachedData, setCachedData } from "@/lib/cache";
import { ActivityFeed } from "@/components/sections/activity-feed";

const CACHE_KEY = "void_github_repos";
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
  homepage: string;
}

const languageColors: Record<string, string> = {
  Python: "#3572A5",
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  Dockerfile: "#384d54",
};

export function LabPageClient() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  async function fetchRepos(force = false) {
    if (!force) {
      const cached = getCachedData<Repo[]>(CACHE_KEY, CACHE_TTL);
      if (cached) {
        setRepos(cached);
        setLoading(false);
        return;
      }
    }

    try {
      const res = await fetch(
        "https://api.github.com/users/m-hasan-2004/repos?per_page=100&sort=updated"
      );
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      const filtered = data
        .filter((r: any) => !r.fork)
        .map((r: any) => ({
          id: r.id,
          name: r.name,
          description: r.description || "No description",
          html_url: r.html_url,
          stargazers_count: r.stargazers_count,
          language: r.language,
          topics: r.topics || [],
          updated_at: r.updated_at,
          homepage: r.homepage,
        }));
      setCachedData(CACHE_KEY, filtered);
      setRepos(filtered);
    } catch {
      // try stale cache as fallback
      const stale = getCachedData<Repo[]>(CACHE_KEY, Infinity);
      if (stale) setRepos(stale);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRepos();
  }, []);

  const languages = Array.from(new Set(repos.map((r) => r.language).filter(Boolean)));

  const filteredRepos =
    filter === "all" ? repos : repos.filter((r) => r.language === filter);

  const timeAgo = (date: string) => {
    const days = Math.floor(
      (Date.now() - new Date(date).getTime()) / (1000 * 60 * 60 * 24)
    );
    if (days < 1) return "today";
    if (days === 1) return "yesterday";
    if (days < 30) return `${days}d ago`;
    if (days < 365) return `${Math.floor(days / 30)}mo ago`;
    return `${Math.floor(days / 365)}y ago`;
  };

  return (
    <section className="min-h-screen pt-24 pb-16 px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            The <span className="gradient-text">Lab</span>
          </h1>
          <p className="text-void-muted text-lg mb-8 max-w-2xl">
            Open source projects, experiments, and builds. All fetched live from GitHub.
          </p>
        </motion.div>

        {/* Language Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center gap-2 mb-8"
        >
          <button
            onClick={() => setFilter("all")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              filter === "all"
                ? "bg-accent-purple text-white"
                : "bg-void-surface text-void-muted hover:text-void-text border border-void-border"
            }`}
          >
            All
          </button>
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => setFilter(lang!)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                filter === lang
                  ? "bg-accent-purple text-white"
                  : "bg-void-surface text-void-muted hover:text-void-text border border-void-border"
              }`}
            >
              {lang}
            </button>
          ))}
          <button
            onClick={() => {
              setLoading(true);
              fetchRepos(true);
            }}
            className="ml-auto rounded-lg p-2 text-void-muted hover:text-void-text hover:bg-void-surface border border-void-border transition-colors"
            aria-label="Refresh projects"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </motion.div>

        {/* Projects Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-48 rounded-xl bg-void-surface/50 animate-pulse border border-void-border"
              />
            ))}
          </div>
        ) : filteredRepos.length === 0 ? (
          <div className="text-center py-20 text-void-muted">
            <Code2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No projects found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRepos.map((repo, i) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full"
                >
                  <Card className="h-full group cursor-pointer overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="group-hover:text-accent-purple transition-colors text-base truncate">
                          {repo.name}
                        </CardTitle>
                        <ExternalLink className="h-4 w-4 text-void-muted opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-0.5" />
                      </div>
                    </CardHeader>
                    <CardContent className="flex flex-col">
                      <CardDescription className="line-clamp-2 mb-3">
                        {repo.description}
                      </CardDescription>
                      {repo.topics.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {repo.topics.slice(0, 4).map((t) => (
                            <Badge key={t} variant="outline" className="text-[10px] shrink-0">
                              {t}
                            </Badge>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center flex-wrap gap-3 text-xs text-void-muted mt-auto pt-2 border-t border-void-border">
                        {repo.language && (
                          <span className="flex items-center gap-1.5 shrink-0">
                            <span
                              className="h-2.5 w-2.5 rounded-full shrink-0"
                              style={{
                                backgroundColor: languageColors[repo.language] || "#999",
                              }}
                            />
                            {repo.language}
                          </span>
                        )}
                        {repo.stargazers_count > 0 && (
                          <span className="flex items-center gap-1 shrink-0">
                            <Star className="h-3 w-3" />
                            {repo.stargazers_count}
                          </span>
                        )}
                        <span className="flex items-center gap-1 shrink-0">
                          <Clock className="h-3 w-3" />
                          {timeAgo(repo.updated_at)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              </motion.div>
            ))}
          </div>
        )}

        <ActivityFeed />
      </div>
    </section>
  );
}
