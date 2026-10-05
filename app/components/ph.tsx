// Visible placeholder. scripts/check-placeholders.mjs fails the build while any <Ph> remains.
export default function Ph({ children }: { children: string }) {
  return (
    <mark className="rounded-sm bg-[#ffe27a] px-1 text-ink outline-1 outline-dashed outline-[#8a6d00]">
      {children}
    </mark>
  );
}
