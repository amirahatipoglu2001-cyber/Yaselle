import { sizeGuideRows } from "@/content/size-guide";

const headers = [
  { key: "tr", label: "TR" },
  { key: "eu", label: "EU" },
  { key: "us", label: "US" },
  { key: "uk", label: "UK/AU/NZ" },
  { key: "bust", label: "Göğüs" },
  { key: "waist", label: "Bel" },
  { key: "hip", label: "Basen" },
] as const;

export function SizeGuideTable() {
  return (
    <div className="mt-10 w-full min-w-0 overflow-x-auto border border-border bg-card">
      <table className="w-full min-w-[44rem] border-collapse text-left text-sm">
        <caption className="bg-muted px-4 py-3 text-center text-[11px] font-medium tracking-[0.18em] text-muted-foreground uppercase">
          Beden tablosu CM
        </caption>
        <thead>
          <tr className="bg-muted">
            {headers.map((header) => (
              <th
                key={header.key}
                scope="col"
                className="px-4 py-3 text-[11px] font-medium tracking-[0.14em] text-muted-foreground uppercase"
              >
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sizeGuideRows.map((row) => (
            <tr key={row.tr} className="odd:bg-card even:bg-muted/80">
              <td className="px-4 py-3 text-foreground">{row.tr}</td>
              <td className="px-4 py-3 text-foreground">{row.eu}</td>
              <td className="px-4 py-3 text-foreground">{row.us}</td>
              <td className="px-4 py-3 text-foreground">{row.uk}</td>
              <td className="px-4 py-3 text-foreground">{row.bust}</td>
              <td className="px-4 py-3 text-foreground">{row.waist}</td>
              <td className="px-4 py-3 text-foreground">{row.hip}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
