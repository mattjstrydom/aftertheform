// Visible placeholder. scripts/check-placeholders.mjs fails the build while any <Ph> or token remains.
export default function Ph({ children }: { children: string }) {
  return (
    <mark className="rounded-sm bg-[#ffe27a] px-1 text-black outline-1 outline-dashed outline-[#8a6d00]">
      {children}
    </mark>
  );
}

// Renders a site.config value: a loud Ph while it is still a token, the plain value once filled, nothing when empty.
const TOKEN = /^\{\{[A-Z0-9_]+\}\}$/;
export function Slot({ value }: { value: string }) {
  if (!value) return null;
  return TOKEN.test(value) ? <Ph>{value}</Ph> : <>{value}</>;
}
