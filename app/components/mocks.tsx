// Product-style illustrations. Values are literal identifiers / example rows, labelled "Example".
const frame = "frag overflow-hidden text-[0.8125rem] leading-snug";
const mono = "font-mono";

function Caption() {
  return <p className="img-label-quiet m-3">Example</p>;
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
          <tr className="border-b border-gray-100 text-gray-600">
            <th scope="col" className="px-3 py-2.5 font-normal">Conversion action</th>
            <th scope="col" className="px-3 py-2.5 font-normal">Goal</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([n, g]) => (
            <tr key={n} className="border-b border-gray-100">
              <td className="px-3 py-2.5">{n}</td>
              <td className="px-3 py-2.5">
                <span className={g === "Primary" ? "goal-primary" : "goal-secondary"}>{g}</span>
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
      <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 border-b border-gray-100 px-3 py-3">
        <dt className="text-gray-600">Name</dt>
        <dd className={mono}>_gcl_aw</dd>
        <dt className="text-gray-600">Value</dt>
        <dd className={`${mono} break-all`}>GCL.1700000000.Cj0KCQ…</dd>
        <dt className="text-gray-600">Domain</dt>
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
      <ul className={`${mono} space-y-1 border-b border-gray-100 px-3 py-3`}>
        <li className="text-gray-600">consent: default</li>
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
