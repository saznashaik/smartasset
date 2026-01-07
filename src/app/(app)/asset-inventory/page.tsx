"use client";

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Upload } from 'lucide-react';

type TableRecord = Record<string, string>;

export default function AssetInventoryPage() {
    const [data, setData] = useState<TableRecord[]>([]);
    const [headers, setHeaders] = useState<string[]>([]);
    const [filter, setFilter] = useState('');

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
                        const headerRow = firstLine.split(',');
                        setHeaders(headerRow);

                        const records: TableRecord[] = lines
                            .filter(line => line.trim() !== '')
                            .map(line => {
                                const values = line.split(',');
                                const record: TableRecord = {};
                                headerRow.forEach((header, index) => {
                                    record[header] = values[index] || '';
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

    const filteredData = useMemo(() => {
        if (!filter) return data;
        return data.filter(row =>
            Object.values(row).some(value =>
                value.toLowerCase().includes(filter.toLowerCase())
            )
        );
    }, [data, filter]);

    return (
        <div className="flex flex-1 flex-col p-4 sm:p-6 h-full">
            <div className="flex items-center gap-4 mb-6">
                <Input
                    type="text"
                    placeholder="Filter data..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="max-w-sm"
                    disabled={data.length === 0}
                />
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

            {data.length > 0 ? (
                <div className="rounded-md border overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {headers.map((header) => (
                                    <TableHead key={header}>{header}</TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredData.map((row, rowIndex) => (
                                <TableRow key={rowIndex}>
                                    {headers.map((header) => (
                                        <TableCell key={`${rowIndex}-${header}`}>
                                            {row[header]}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            ) : (
                <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
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