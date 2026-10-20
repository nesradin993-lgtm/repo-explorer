import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";

type SearchFormProps = {
  onSearch: (username: string) => void;
};

export function SearchForm({ onSearch }: SearchFormProps) {
  const [draft, setDraft] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearch(draft.trim());
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <label htmlFor="username" className="sr-only">
        GitHub username
      </label>

      <input
        ref={inputRef}
        id="username"
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        placeholder="e.g. torvalds"
        autoComplete="off"
        className="flex-1 rounded-lg border px-3 py-2"
      />

      <button
        type="submit"
        className="rounded-lg bg-violet-600 px-4 py-2 text-white"
      >
        Search
      </button>
    </form>
  );
}