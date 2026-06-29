import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function fetchGitHubRepos(token?: string) {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch("https://api.github.com/users/m-hasan-2004/repos?per_page=100&sort=updated", {
    headers,
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error("Failed to fetch repos");

  const repos = await res.json();

  return repos
    .filter((repo: any) => !repo.fork)
    .map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description || "No description",
      html_url: repo.html_url,
      stargazers_count: repo.stargazers_count,
      language: repo.language,
      topics: repo.topics || [],
      updated_at: repo.updated_at,
      homepage: repo.homepage,
    }));
}
