import type { Repo } from "./github";
import type { SortKey } from "../components/SortDropdown";

export function sortRepos(repos: Repo[], sort: SortKey): Repo[] {
  switch (sort) {
    case "stars":
      return repos.toSorted(
        (a, b) => b.stargazers_count - a.stargazers_count
      );

    case "recent":
      return repos.toSorted((a, b) =>
        b.updated_at.localeCompare(a.updated_at)
      );

    case "name":
      return repos.toSorted((a, b) => a.name.localeCompare(b.name));
  }
}