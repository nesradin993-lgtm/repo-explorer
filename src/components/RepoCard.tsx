import type { Repo } from "../lib/github";

type RepoCardProps = {
  repo: Repo;
};

export function RepoCard({ repo }: RepoCardProps) {
  return (
    <li className="rounded-xl border border-zinc-800 p-4">
      <a
        href={repo.html_url}
        target="_blank"
        rel="noreferrer"
        className="font-semibold text-violet-700"
      >
        {repo.name}
      </a>

      {repo.description && (
        <p className="mt-1 text-sm text-zinc-600">{repo.description}</p>
      )}

      <p className="mt-2 text-xs text-zinc-500">
        ★ {repo.stargazers_count} · {repo.language ?? "—"} · updated{" "}
        {new Date(repo.updated_at).toLocaleDateString()}
      </p>
    </li>
  );
}