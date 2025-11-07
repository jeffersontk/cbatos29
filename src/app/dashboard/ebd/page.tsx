'use client';
import * as React from 'react';
import { JSX } from 'react';

export type Column<T> = {
  header: string;
  accessor: keyof T;
  cell?: (value: T[keyof T] | undefined, row: T) => React.ReactNode;
};

export type DataTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
  mobileCard?: (row: T) => React.ReactNode;
};

export function DataTable<T>(props: DataTableProps<T>) {
  const { columns, data, emptyMessage = 'Nenhum registro', mobileCard } = props;

  return (
    <div className="space-y-4">
      <div className="hidden md:block overflow-x-auto rounded-lg border">
        <table className="min-w-full text-sm">
          <thead className="bg-muted/40">
            <tr>
              {columns.map((col) => (
                <th key={String(col.accessor)} className="px-4 py-3 text-left font-medium">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-6 text-center text-muted-foreground">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, idx) => (
                <tr key={idx} className="border-t">
                  {columns.map((col) => {
                    const value = row[col.accessor];
                    return (
                      <td key={String(col.accessor)} className="px-4 py-3">
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
      <div className="md:hidden space-y-3">
        {data.length === 0 ? (
          <div className="rounded-lg border p-4 text-center text-muted-foreground">{emptyMessage}</div>
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
                <div key={String(c.accessor)} className="flex justify-between py-1 text-sm">
                  <span className="font-medium">{c.header}</span>
                  <span>{String(row[c.accessor] ?? '')}</span>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default DataTable as <T,>(props: DataTableProps<T>) => JSX.Element;
