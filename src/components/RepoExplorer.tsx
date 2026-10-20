import { useEffect, useState } from "react";
import { fetchRepos } from "../lib/github";
import type { Repo } from "../lib/github";
import { sortRepos } from "../lib/sortRepos";
import { RepoCard } from "./RepoCard";
import type { SortKey } from "./SortDropdown";

export type FetchState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success"; repos: Repo[] };

export function RepoExplorer({
  username,
  sort,
}: {
  username: string;
  sort: SortKey;
}) {
  const [state, setState] = useState<FetchState>({ status: "idle" });

  useEffect(() => {
    if (username.trim() === "") {
      return;
    }

    const controller = new AbortController();

    async function load() {
      setState({ status: "loading" });

      try {
        const repos = await fetchRepos(username, controller.signal);
        setState({ status: "success", repos });
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        const message =
          error instanceof Error ? error.message : "Something went wrong";

        setState({ status: "error", message });
      }
    }

    load();

    return () => controller.abort();
  }, [username]);

  const sortedRepos =
    state.status === "success" ? sortRepos(state.repos, sort) : [];

  if (username.trim() === "" || state.status === "idle") {
    return <p>Enter a GitHub username to begin.</p>;
  }

  if (state.status === "loading") {
    return <p role="status">Loading repositories…</p>;
  }

  if (state.status === "error") {
    return <p role="alert">{state.message}</p>;
  }

  if (state.repos.length === 0) {
    return <p>This user has no public repositories.</p>;
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {sortedRepos.map((repo) => (
        <RepoCard key={repo.id} repo={repo} />
      ))}
    </ul>
  );
}