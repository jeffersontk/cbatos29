import type { ReactNode } from "react";

import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export interface Column<T> {
  header: string;
  cell: (row: T) => ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
}

export default function DataTable<T>({
  columns,
  data,
  emptyMessage = "Nenhum registro encontrado.",
}: DataTableProps<T>) {
  return (
    <Card className="overflow-hidden border-border/70">
      {data.length === 0 ? (
        <div className="px-4 py-8 text-center text-sm text-muted-foreground sm:px-6">{emptyMessage}</div>
      ) : (
        <>
          <div className="divide-y md:hidden">
            {data.map((row, rowIndex) => (
              <div key={rowIndex} className="space-y-4 p-4">
                {columns.map((column, colIndex) => (
                  <div key={colIndex} className="space-y-1">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{column.header}</p>
                    <div>{column.cell(row)}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="hidden md:block">
            <Table className="min-w-[720px]">
              <TableHeader>
                <TableRow>
                  {columns.map((column, index) => (
                    <TableHead key={index} className={column.className}>
                      {column.header}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {columns.map((column, colIndex) => (
                      <TableCell key={colIndex} className={column.className}>
                        {column.cell(row)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      )}
    </Card>
  );
}
