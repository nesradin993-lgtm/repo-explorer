export type Repo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
  fork: boolean;
};

export class GithubError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "GithubError";
    this.status = status;
  }

}

export async function fetchRepos(
  username: string,
  signal?: AbortSignal
): Promise<Repo[]> {
  const url =
    `https://api.github.com/users/${encodeURIComponent(username)}` +
    `/repos?per_page=100&sort=updated`;

  const response = await fetch(url, {
    signal,
    headers: { Accept: "application/vnd.github+json" },
  });

  if (response.status === 404) {
    throw new GithubError(`No GitHub user named "${username}"`, 404);
  }

  if (response.status === 403 || response.status === 429) {
    throw new GithubError(
      "GitHub rate limit reached. Try again in a few minutes.",
      response.status
    );
  }

  if (!response.ok) {
    throw new GithubError(`GitHub returned ${response.status}`, response.status);
  }

  const repos = (await response.json()) as Repo[];
  return repos.filter((repo) => !repo.fork);
}