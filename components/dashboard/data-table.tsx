import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function DataTable({
  columns,
  rows,
  empty = "No records found."
}: {
  columns: string[];
  rows: ReactNode[][];
  empty?: string;
}) {
  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              {columns.map((column) => (
                <th key={column} className="border-b border-slate-200 px-4 py-3 font-bold">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {rows.length ? (
              rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-slate-50">
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="px-4 py-3 align-top text-slate-700">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-4 py-8 text-center text-slate-500" colSpan={columns.length}>
                  {empty}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function StatusPill({ status }: { status: string }) {
  const styles =
    status === "active" || status === "approved" || status === "good"
      ? "bg-emerald-50 text-emerald-700"
      : status === "expired" || status === "flagged" || status === "needs repair"
        ? "bg-rose-50 text-rose-700"
        : "bg-amber-50 text-amber-700";

  return <span className={cn("status-pill", styles)}>{status.replaceAll("_", " ")}</span>;
}
