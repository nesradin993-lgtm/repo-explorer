import { useState } from "react";
import { SearchForm } from "./components/SearchForm";
import { SortDropdown, type SortKey } from "./components/SortDropdown";
import { RepoExplorer } from "./components/RepoExplorer";

export default function App() {
  const [username, setUsername] = useState("");
  const [sort, setSort] = useState<SortKey>("stars");

  return (
    <main className="mx-auto max-w-3xl space-y-6 p-6">
      <h1 className="text-3xl font-bold">GitHub Repo Explorer</h1>

      <SearchForm onSearch={setUsername} />
      <SortDropdown value={sort} onChange={setSort} />
      <RepoExplorer username={username} sort={sort} />
    </main>
  );
}