// Product-style illustrations. Values are literal identifiers / example rows, labelled "Example".
const frame = "rounded-[10px] border border-hairline bg-white text-[0.8125rem] leading-snug";
const mono = "font-mono";

function Caption() {
  return <p className="border-t border-hairline px-3 py-1.5 text-xs text-grey">Example</p>;
}

export function ConversionMock() {
  const rows: [string, "Primary" | "Secondary"][] = [
    ["Lead form submit", "Primary"],
    ["HubSpot MQL", "Secondary"],
    ["HubSpot SQL", "Secondary"],
    ["Test conversion", "Secondary"],
  ];
  return (
    <div className={frame}>
      <table className="w-full border-collapse text-left">
        <caption className="sr-only">Example conversion action list</caption>
        <thead>
          <tr className="border-b border-hairline text-grey">
            <th className="px-3 py-2 font-normal">Conversion action</th>
            <th className="px-3 py-2 font-normal">Goal</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([n, g]) => (
            <tr key={n} className="border-b border-hairline last:border-0">
              <td className="px-3 py-2">{n}</td>
              <td className="px-3 py-2">
                <span
                  className={`rounded-[4px] px-1.5 py-0.5 text-xs ${
                    g === "Primary" ? "bg-ink text-white" : "border border-hairline text-grey"
                  }`}
                >
                  {g}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Caption />
    </div>
  );
}

export function CookieMock() {
  return (
    <div className={frame}>
      <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 px-3 py-2">
        <dt className="text-grey">Name</dt>
        <dd className={mono}>_gcl_aw</dd>
        <dt className="text-grey">Value</dt>
        <dd className={`${mono} break-all`}>GCL.1700000000.Cj0KCQ…</dd>
        <dt className="text-grey">Domain</dt>
        <dd className={mono}>.example.com</dd>
      </dl>
      <Caption />
    </div>
  );
}

export function ConsentMock() {
  const keys = ["ad_storage", "analytics_storage", "ad_user_data", "ad_personalization"];
  return (
    <div className={frame}>
      <ul className={`${mono} px-3 py-2`}>
        <li className="text-grey">consent: default</li>
        {keys.map((k) => (
          <li key={k} className="flex justify-between gap-4">
            <span>{k}</span>
            <span>denied</span>
          </li>
        ))}
      </ul>
      <Caption />
    </div>
  );
}
