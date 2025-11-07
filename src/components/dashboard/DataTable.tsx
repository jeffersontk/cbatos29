'use client';
import * as React from "react";
import { JSX } from "react";

export type Column<T> = {
  header: string;
  accessor: keyof T;
  cell?: (value: T[keyof T], row: T) => React.ReactNode;
};

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
  mobileCard?: (row: T) => React.ReactNode;
}

function DataTableInner<T>({
  columns,
  data,
  emptyMessage = "Nenhum registro encontrado.",
  mobileCard,
}: DataTableProps<T>) {
  return (
    <div className="space-y-4">
      {/* Table (desktop) */}
      <div className="hidden overflow-x-auto rounded-md border md:block">
        <table className="min-w-full text-sm">
          <thead className="bg-muted/40">
            <tr>
              {columns.map((col) => (
                <th
                  key={String(col.accessor)}
                  className="px-4 py-2 text-left font-medium"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-4 text-center text-muted-foreground"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, i) => (
                <tr key={i} className="border-t">
                  {columns.map((col) => {
                    const value = row[col.accessor];
                    return (
                      <td key={String(col.accessor)} className="px-4 py-2">
                        {col.cell ? col.cell(value, row) : (value as React.ReactNode)}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Cards (mobile) */}
      <div className="space-y-3 md:hidden">
        {data.length === 0 ? (
          <div className="rounded-lg border p-4 text-center text-muted-foreground">
            {emptyMessage}
          </div>
        ) : mobileCard ? (
          data.map((row, i) => (
            <div key={i} className="rounded-lg border p-4">
              {mobileCard(row)}
            </div>
          ))
        ) : (
          data.map((row, i) => (
            <div key={i} className="rounded-lg border p-4">
              {columns.map((c) => (
                <div
                  key={String(c.accessor)}
                  className="flex justify-between text-sm py-1"
                >
                  <span className="font-medium">{c.header}</span>
                  <span>{String(row[c.accessor] ?? "")}</span>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

/** Export com suporte a generics JSX (<DataTable<T>> ...) */
export const DataTable = DataTableInner as <T>(
  props: DataTableProps<T>
) => JSX.Element;

export default DataTable;
