export type SortKey = "stars" | "recent" | "name";

type SortDropdownProps = {
  value: SortKey;
  onChange: (next: SortKey) => void;
};

export function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <label className="flex items-center gap-2 text-sm">
      Sort by
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as SortKey)}
        className="rounded-lg border px-2 py-1"
      >
        <option value="stars">Most stars</option>
        <option value="recent">Recently updated</option>
        <option value="name">Name A–Z</option>
      </select>
    </label>
  );
}