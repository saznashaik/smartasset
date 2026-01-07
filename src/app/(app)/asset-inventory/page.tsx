"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Filter, X } from 'lucide-react';
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

const DISPLAY_HEADERS = [
    'Asset ID',
    'Asset Type',
    'Location',
    'Condition',
    'Risk Score',
    'Predicted Failure',
    'Recommended Action'
];

export default function AssetInventoryPage() {
    const [originalData, setOriginalData] = useState<TableRecord[]>([]);
    const [filteredData, setFilteredData] = useState<TableRecord[]>([]);
    const [allHeaders, setAllHeaders] = useState<string[]>([]);
    const [filters, setFilters] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://raw.githubusercontent.com/saznashaik/smartasset/main/asset_decision_predictions%20(1).csv');
                const text = await response.text();
                
                if (text) {
                    const lines = text.split(/\r\n|\n/).filter(line => line.trim() !== '');
                    if (lines.length > 0) {
                        const firstLine = lines.shift() as string;
                        const headerRow = parseCsvLine(firstLine);
                        setFilters({});

                        const records: TableRecord[] = lines.map(line => {
                            const values = parseCsvLine(line);
                            const record: TableRecord = {};
                            headerRow.forEach((header, index) => {
                                record[header] = values[index] || '';
                            });
                            return record;
                        });
                        setOriginalData(records);
                        setFilteredData(records);
                        setAllHeaders(DISPLAY_HEADERS);
                    }
                }
            } catch (error) {
                console.error("Error fetching or parsing CSV data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    
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
            if (value === null || (newFilters[header] && value !== null && newFilters[header] === value)) {
                 delete newFilters[header];
            } else if (value === null) {
                delete newFilters[header];
            }
            else {
                newFilters[header] = value;
            }
            return newFilters;
        });
    };
    
    const clearFilter = (header: string) => {
        setFilters(prev => {
            const newFilters = { ...prev };
            delete newFilters[header];
            return newFilters;
        })
    }

    return (
        <div className="flex flex-1 flex-col p-4 sm:p-6 h-full gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Asset Inventory</h2>
                    <p className="text-sm text-muted-foreground">View, search, and filter all enterprise assets.</p>
                </div>
            </div>

            {loading ? (
                 <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm min-h-[400px]">
                    <div className="flex flex-col items-center gap-2 text-center">
                        <h3 className="text-2xl font-bold tracking-tight">
                            Loading Data...
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            Fetching asset data from the source.
                        </p>
                    </div>
                </div>
            ) : originalData.length > 0 ? (
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
                                        onClick={() => clearFilter(header)}
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
                                                    <DropdownMenuContent className="max-h-96 overflow-y-auto">
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
                                                        
                                                        {getUniqueColumnValues(header).map(value => (
                                                            <DropdownMenuCheckboxItem
                                                                key={value}
                                                                checked={filters[header] === value}
                                                                onSelect={() => handleFilterChange(header, value)}
                                                            >
                                                                {value}
                                                            </DropdownMenuCheckboxItem>
                                                        ))}
                                                        
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
                            No data available
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            Could not load data from the source.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
