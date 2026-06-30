"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  GitCommitHorizontal,
  Users,
  Eye,
  Star,
  GitFork,
  BookOpen,
  Activity,
  RefreshCw,
} from "lucide-react";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getCachedData, setCachedData } from "@/lib/cache";

const GITHUB_USER = "m-hasan-2004";
const EVENTS_CACHE_KEY = "void_github_events";
const PROFILE_CACHE_KEY = "void_github_profile";
const REPOS_CACHE_KEY = "void_github_top_repos";
const CACHE_TTL = 5 * 60 * 1000;

interface CommitEvent {
  id: string;
  repo: string;
  message: string;
  author: string;
  date: string;
  url: string;
}

interface GitHubProfile {
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  avatar_url: string;
}

interface PushEvent {
  id: string;
  repo: string;
  repoShort: string;
  sha: string;
  date: string;
}

interface RepoMinimal {
  name: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
}

export function ActivityFeed() {
  const [commits, setCommits] = useState<CommitEvent[]>([]);
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [topRepos, setTopRepos] = useState<RepoMinimal[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchData(force = false) {
    if (!force) {
      const cachedEvents = getCachedData<CommitEvent[]>(EVENTS_CACHE_KEY, CACHE_TTL);
      const cachedProfile = getCachedData<GitHubProfile>(PROFILE_CACHE_KEY, 30 * 60 * 1000);
      const cachedRepos = getCachedData<RepoMinimal[]>(REPOS_CACHE_KEY, CACHE_TTL);
      if (cachedEvents && cachedProfile && cachedRepos) {
        setCommits(cachedEvents);
        setProfile(cachedProfile);
        setTopRepos(cachedRepos);
        setLoading(false);
        return;
      }
    }

    // Fetch events
    try {
      const res = await fetch(`https://api.github.com/users/${GITHUB_USER}/events?per_page=30`);
      if (res.ok) {
        const events = await res.json();
        const pushEvents = events
          .filter((e: any) => e.type === "PushEvent" && e.payload.head)
          .map((e: any): PushEvent => ({
            id: e.id,
            repo: e.repo.name,
            repoShort: e.repo.name.replace(`${GITHUB_USER}/`, ""),
            sha: e.payload.head as string,
            date: e.created_at,
          }))
          .slice(0, 12);

        const enriched = await Promise.all(
          pushEvents.map(async (evt: PushEvent) => {
            try {
              const r = await fetch(
                `https://api.github.com/repos/${evt.repo}/commits/${evt.sha}`
              );
              if (r.ok) {
                const data = await r.json();
                return {
                  id: evt.id,
                  repo: evt.repoShort,
                  message: data.commit.message.split("\n")[0],
                  author: data.commit.author?.name || GITHUB_USER,
                  date: evt.date,
                  url: `https://github.com/${evt.repo}/commit/${evt.sha}`,
                };
              }
            } catch {}
            return {
              id: evt.id,
              repo: evt.repoShort,
              message: evt.sha.slice(0, 7),
              author: GITHUB_USER,
              date: evt.date,
              url: `https://github.com/${evt.repo}/commit/${evt.sha}`,
            };
          })
        );

        setCommits(enriched);
        setCachedData(EVENTS_CACHE_KEY, enriched);
      }
    } catch {
      const stale = getCachedData<CommitEvent[]>(EVENTS_CACHE_KEY, Infinity);
      if (stale) setCommits(stale);
    }

    // Fetch profile
    try {
      const res = await fetch(`https://api.github.com/users/${GITHUB_USER}`);
      if (res.ok) {
        const p = await res.json();
        const profileData: GitHubProfile = {
          public_repos: p.public_repos,
          followers: p.followers,
          following: p.following,
          created_at: p.created_at,
          avatar_url: p.avatar_url,
        };
        setProfile(profileData);
        setCachedData(PROFILE_CACHE_KEY, profileData);
      }
    } catch {
      const stale = getCachedData<GitHubProfile>(PROFILE_CACHE_KEY, Infinity);
      if (stale) setProfile(stale);
    }

    // Fetch repos
    try {
      const res = await fetch(
        `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=stars&direction=desc`
      );
      if (res.ok) {
        const repos = await res.json();
        const sorted = repos
          .filter((r: any) => !r.fork && r.name !== GITHUB_USER)
          .sort((a: any, b: any) => b.stargazers_count - a.stargazers_count)
          .slice(0, 5)
          .map((r: any) => ({
            name: r.name,
            stargazers_count: r.stargazers_count,
            forks_count: r.forks_count,
            language: r.language,
          }));
        setTopRepos(sorted);
        setCachedData(REPOS_CACHE_KEY, sorted);
      }
    } catch {
      const stale = getCachedData<RepoMinimal[]>(REPOS_CACHE_KEY, Infinity);
      if (stale) setTopRepos(stale);
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const timeAgo = (date: string) => {
    const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
    if (seconds < 60) return "just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days === 1) return "yesterday";
    if (days < 30) return `${days}d ago`;
    const months = Math.floor(days / 30);
    return `${months}mo ago`;
  };

  const accountAge = profile
    ? Math.floor(
        (Date.now() - new Date(profile.created_at).getTime()) /
          (1000 * 60 * 60 * 24 * 365)
      )
    : 0;

  return (
    <section className="mt-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Activity className="h-5 w-5 text-accent-purple" />
            <h2 className="text-2xl font-bold">
              GitHub <span className="gradient-text">Activity</span>
            </h2>
          </div>
          <button
            onClick={() => {
              setLoading(true);
              fetchData(true);
            }}
            className="rounded-lg p-2 text-void-muted hover:text-void-text hover:bg-void-surface border border-void-border transition-colors"
            aria-label="Refresh activity"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>

        {/* Stats Row */}
        {profile && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {[
              { icon: BookOpen, label: "Repos", value: profile.public_repos },
              { icon: Users, label: "Followers", value: profile.followers },
              { icon: Eye, label: "Following", value: profile.following },
              {
                icon: Star,
                label: "Top stars",
                value: topRepos.reduce((sum, r) => sum + r.stargazers_count, 0),
              },
            ].map((stat) => (
              <Card key={stat.label} className="py-3">
                <CardContent className="flex items-center gap-3 px-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-purple/10">
                    <stat.icon className="h-4 w-4 text-accent-purple" />
                  </div>
                  <div>
                    <p className="text-lg font-bold leading-tight">{stat.value.toLocaleString()}</p>
                    <p className="text-xs text-void-muted">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Commit Feed */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <GitCommitHorizontal className="h-4 w-4 text-accent-blue" />
                  Recent Commits
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-3">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-14 rounded-lg bg-void-surface/50 animate-pulse" />
                    ))}
                  </div>
                ) : commits.length === 0 ? (
                  <p className="text-sm text-void-muted py-8 text-center">No recent activity</p>
                ) : (
                  <div className="space-y-1 max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
                    {commits.map((commit, i) => (
                      <motion.a
                        key={commit.id}
                        href={commit.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.03 }}
                        className="flex items-start gap-3 rounded-lg px-3 py-2.5 hover:bg-void-surface transition-colors group"
                      >
                        <div className="mt-1 h-2 w-2 rounded-full bg-accent-blue shrink-0 group-hover:bg-accent-purple transition-colors" />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm text-void-text truncate">{commit.message}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs text-accent-purple font-medium">
                              {commit.repo}
                            </span>
                            <span className="text-xs text-void-muted">
                              {timeAgo(commit.date)}
                            </span>
                          </div>
                        </div>
                      </motion.a>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Top Repos */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  Top Repositories
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-3">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-12 rounded-lg bg-void-surface/50 animate-pulse" />
                    ))}
                  </div>
                ) : topRepos.length === 0 ? (
                  <p className="text-sm text-void-muted py-8 text-center">No repos found</p>
                ) : (
                  <div className="space-y-1">
                    {topRepos.map((repo, i) => (
                      <motion.a
                        key={repo.name}
                        href={`https://github.com/${GITHUB_USER}/${repo.name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-center justify-between rounded-lg px-3 py-2.5 hover:bg-void-surface transition-colors group"
                      >
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-void-text group-hover:text-accent-purple transition-colors truncate">
                            {repo.name}
                          </p>
                          <p className="text-xs text-void-muted">
                            {repo.language || "N/A"}
                          </p>
                        </div>
                        <div className="flex items-center gap-3 shrink-0 ml-3">
                          {repo.stargazers_count > 0 && (
                            <span className="flex items-center gap-1 text-xs text-void-muted">
                              <Star className="h-3 w-3" />
                              {repo.stargazers_count}
                            </span>
                          )}
                          {repo.forks_count > 0 && (
                            <span className="flex items-center gap-1 text-xs text-void-muted">
                              <GitFork className="h-3 w-3" />
                              {repo.forks_count}
                            </span>
                          )}
                        </div>
                      </motion.a>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Account Info */}
            {profile && (
              <Card className="mt-4">
                <CardContent className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {profile.avatar_url ? (
                      <Image
                        src={profile.avatar_url}
                        alt={GITHUB_USER}
                        width={36}
                        height={36}
                        className="h-9 w-9 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-accent-purple to-accent-blue">
                        <span className="text-sm font-bold text-white">
                          {GITHUB_USER.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium">{GITHUB_USER}</p>
                      <p className="text-xs text-void-muted">
                        Coding for {accountAge}+ years
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
