"use client";

import { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from "@/components/ui/badge";
import { Upload } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

type TableRecord = Record<string, string>;

export default function AssetInventoryPage() {
    const [data, setData] = useState<TableRecord[]>([]);
    const [allHeaders, setAllHeaders] = useState<string[]>([]);
    
    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target?.result as string;
                if (text) {
                    const lines = text.split(/\r\n|\n/);
                    if (lines.length > 0) {
                        const firstLine = lines.shift() as string;
                        const headerRow = firstLine.split(',').map(h => h.trim());
                        setAllHeaders(headerRow);

                        const records: TableRecord[] = lines
                            .filter(line => line.trim() !== '')
                            .map(line => {
                                const values = line.split(',');
                                const record: TableRecord = {};
                                headerRow.forEach((header, index) => {
                                    record[header] = values[index]?.trim() || '';
                                });
                                return record;
                            });
                        setData(records);
                    }
                }
            };
            reader.readAsText(file);
        }
    };

    return (
        <div className="flex flex-1 flex-col p-4 sm:p-6 h-full gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Asset Inventory</h2>
                    <p className="text-sm text-muted-foreground">View, search, and filter all enterprise assets.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button asChild variant="outline">
                        <label htmlFor="csv-upload" className="cursor-pointer">
                            <Upload className="mr-2" />
                            Upload CSV
                            <input
                                id="csv-upload"
                                type="file"
                                accept=".csv"
                                onChange={handleFileUpload}
                                className="hidden"
                            />
                        </label>
                    </Button>
                </div>
            </div>

            {data.length > 0 ? (
                <div className="rounded-md border overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[50px] p-2">
                                     <Checkbox />
                                </TableHead>
                                {allHeaders.map((header) => (
                                    <TableHead key={header} className="p-2">{header}</TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((row, rowIndex) => (
                                <TableRow key={rowIndex}>
                                     <TableCell className="p-2">
                                        <Checkbox />
                                    </TableCell>
                                    {allHeaders.map((header) => (
                                        <TableCell key={`${rowIndex}-${header}`} className="p-2">
                                            {header === 'Status' ? (
                                                <Badge variant={row[header] === 'Active' ? 'default' : 'destructive'} className={row[header] === 'Active' ? 'bg-green-500' : ''}>{row[header]}</Badge>
                                            ) : (
                                                row[header]
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            ) : (
                <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm min-h-[400px]">
                    <div className="flex flex-col items-center gap-2 text-center">
                        <h3 className="text-2xl font-bold tracking-tight">
                            No data uploaded
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            Upload a CSV file to see your asset inventory.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
