"use client";

import { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Upload, Filter, X } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

type TableRecord = Record<string, string>;

// A more robust CSV parser that handles quoted fields.
const parseCsvLine = (line: string): string[] => {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
            if (inQuotes && line[i + 1] === '"') {
                // Handle escaped quote
                current += '"';
                i++;
            } else {
                inQuotes = !inQuotes;
            }
        } else if (char === ',' && !inQuotes) {
            result.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }
    result.push(current.trim());
    return result;
};

export default function AssetInventoryPage() {
    const [originalData, setOriginalData] = useState<TableRecord[]>([]);
    const [filteredData, setFilteredData] = useState<TableRecord[]>([]);
    const [allHeaders, setAllHeaders] = useState<string[]>([]);
    const [filters, setFilters] = useState<Record<string, string>>({});

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target?.result as string;
                if (text) {
                    const lines = text.split(/\r\n|\n/).filter(line => line.trim() !== '');
                    if (lines.length > 0) {
                        const firstLine = lines.shift() as string;
                        const headerRow = parseCsvLine(firstLine);
                        setAllHeaders(headerRow);
                        setFilters({});

                        const records: TableRecord[] = lines
                            .map(line => {
                                const values = parseCsvLine(line);
                                const record: TableRecord = {};
                                headerRow.forEach((header, index) => {
                                    record[header] = values[index] || '';
                                });
                                return record;
                            });
                        setOriginalData(records);
                        setFilteredData(records);
                    }
                }
            };
            reader.readAsText(file);
        }
    };
    
    useEffect(() => {
        if (Object.keys(filters).length === 0) {
            setFilteredData(originalData);
            return;
        }

        const newFilteredData = originalData.filter(row => {
            return Object.entries(filters).every(([header, value]) => {
                return !value || row[header] === value;
            });
        });
        setFilteredData(newFilteredData);
    }, [filters, originalData]);

    const getUniqueColumnValues = (header: string) => {
        const values = new Set<string>();
        originalData.forEach(row => {
            if (row[header]) {
                values.add(row[header]);
            }
        });
        return Array.from(values).sort();
    };

    const handleFilterChange = (header: string, value: string | null) => {
        setFilters(prev => {
            const newFilters = { ...prev };
            if (value === null || newFilters[header] === value) {
                // Uncheck/clear filter
                delete newFilters[header];
            } else {
                newFilters[header] = value;
            }
            return newFilters;
        });
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

            {originalData.length > 0 ? (
                <>
                    {Object.keys(filters).length > 0 && (
                        <div className="flex items-center gap-2 flex-wrap">
                            <p className="text-sm font-medium">Active Filters:</p>
                            {Object.entries(filters).map(([header, value]) => (
                                <Badge key={header} variant="secondary" className="flex items-center gap-1">
                                    {header}: {value}
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-4 w-4 rounded-full"
                                        onClick={() => handleFilterChange(header, null)}
                                    >
                                        <X className="h-3 w-3" />
                                    </Button>
                                </Badge>
                            ))}
                        </div>
                    )}
                    <div className="rounded-md border overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[50px] p-2">
                                         <Checkbox />
                                    </TableHead>
                                    {allHeaders.map((header) => (
                                        <TableHead key={header} className="p-2">
                                            <div className="flex items-center gap-2">
                                                {header}
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="h-6 w-6">
                                                            <Filter className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent>
                                                        <DropdownMenuLabel>{header}</DropdownMenuLabel>
                                                        <DropdownMenuSeparator />
                                                        {filters[header] && (
                                                            <>
                                                                <DropdownMenuCheckboxItem
                                                                    onSelect={() => handleFilterChange(header, null)}
                                                                >
                                                                    Clear Filter
                                                                </DropdownMenuCheckboxItem>
                                                                <DropdownMenuSeparator />
                                                            </>
                                                        )}
                                                        <ScrollArea className="max-h-60">
                                                            {getUniqueColumnValues(header).map(value => (
                                                                <DropdownMenuCheckboxItem
                                                                    key={value}
                                                                    checked={filters[header] === value}
                                                                    onSelect={() => handleFilterChange(header, value)}
                                                                >
                                                                    {value}
                                                                </DropdownMenuCheckboxItem>
                                                            ))}
                                                        </ScrollArea>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </TableHead>
                                    ))}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredData.map((row, rowIndex) => (
                                    <TableRow key={rowIndex}>
                                         <TableCell className="p-2">
                                            <Checkbox />
                                        </TableCell>
                                        {allHeaders.map((header) => (
                                            <TableCell key={`${rowIndex}-${header}`} className="p-2">
                                                {row[header]}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </>
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