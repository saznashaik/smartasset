"use client";

import { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Upload, Search, Download, Save, X, ChevronDown } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuCheckboxItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

type TableRecord = Record<string, string>;

export default function AssetInventoryPage() {
    const [data, setData] = useState<TableRecord[]>([]);
    const [allHeaders, setAllHeaders] = useState<string[]>([]);
    const [visibleHeaders, setVisibleHeaders] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState<Record<string, string>>({});
    const [dropdownOptions, setDropdownOptions] = useState<Record<string, string[]>>({});

    useEffect(() => {
        if (data.length > 0) {
            const options: Record<string, string[]> = {};
            allHeaders.forEach(header => {
                const uniqueValues = [...new Set(data.map(row => row[header]).filter(Boolean))];
                options[header] = uniqueValues;
            });
            setDropdownOptions(options);
        }
    }, [data, allHeaders]);

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
                        setVisibleHeaders(headerRow);
                        setFilters({});
                        setSearchTerm('');

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

    const handleFilterChange = (column: string, value: string) => {
        setFilters(prev => {
            if (value === 'all') {
                const newFilters = { ...prev };
                delete newFilters[column];
                return newFilters;
            }
            return { ...prev, [column]: value };
        });
    };

    const removeFilter = (column: string) => {
        setFilters(prev => {
            const newFilters = { ...prev };
            delete newFilters[column];
            return newFilters;
        });
    };

    const clearAllFilters = () => {
        setFilters({});
        setSearchTerm('');
    };

    const filteredData = useMemo(() => {
        let filtered = data;

        if (searchTerm) {
            filtered = filtered.filter(row =>
                Object.values(row).some(value =>
                    value.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }

        if (Object.keys(filters).length > 0) {
            filtered = filtered.filter(row =>
                Object.entries(filters).every(([key, value]) =>
                    row[key] && row[key] === value
                )
            );
        }

        return filtered;
    }, [data, searchTerm, filters]);

    const activeFilters = Object.entries(filters);

    const toggleColumnVisibility = (header: string) => {
        setVisibleHeaders(prev => 
            prev.includes(header) 
                ? prev.filter(h => h !== header) 
                : [...prev, header]
        );
    };

    return (
        <div className="flex flex-1 flex-col p-4 sm:p-6 h-full gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Asset Inventory</h2>
                    <p className="text-sm text-muted-foreground">View, search, and filter all enterprise assets.</p>
                </div>
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


            <div className="p-4 border rounded-lg bg-card space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-grow">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="text"
                            placeholder="Search Asset ID, Brand, Model..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 w-full"
                            disabled={data.length === 0}
                        />
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" disabled={data.length === 0}>
                                Filter Columns <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {allHeaders.map((header) => (
                                <DropdownMenuCheckboxItem
                                    key={header}
                                    checked={visibleHeaders.includes(header)}
                                    onCheckedChange={() => toggleColumnVisibility(header)}
                                    onSelect={(e) => e.preventDefault()}
                                >
                                    {header}
                                </DropdownMenuCheckboxItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {visibleHeaders.map(header => (
                        <div key={header} className="min-w-[120px]">
                            <Select
                                onValueChange={(value) => handleFilterChange(header, value)}
                                value={filters[header] || 'all'}
                                disabled={data.length === 0 || !dropdownOptions[header] || dropdownOptions[header].length === 0}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder={`Filter ${header}`} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All {header}s</SelectItem>
                                    {dropdownOptions[header]?.map(option => (
                                        <SelectItem key={option} value={option}>{option}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    ))}
                </div>

                {activeFilters.length > 0 && (
                     <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-medium">Active Filters:</span>
                        {activeFilters.map(([key, value]) => (
                            <Badge key={key} variant="secondary" className="pl-2">
                                {key}: {value}
                                <button onClick={() => removeFilter(key)} className="ml-1.5 p-0.5 rounded-full hover:bg-muted-foreground/20">
                                   <X className="h-3 w-3" />
                                </button>
                            </Badge>
                        ))}
                        <Button variant="link" size="sm" onClick={clearAllFilters} className="h-auto p-0 text-primary">
                            Clear All
                        </Button>
                    </div>
                )}
                 <div className="flex items-center justify-end gap-2 pt-2">
                    <Button variant="outline" size="sm" disabled={data.length === 0}><Download className="mr-2"/>Export CSV</Button>
                    <Button variant="outline" size="sm" disabled={data.length === 0}><Save className="mr-2"/>Save View</Button>
                </div>
            </div>

            {data.length > 0 ? (
                <div className="rounded-md border overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[50px]">
                                     <Checkbox />
                                </TableHead>
                                {visibleHeaders.map((header) => (
                                    <TableHead key={header}>{header}</TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredData.map((row, rowIndex) => (
                                <TableRow key={rowIndex}>
                                     <TableCell>
                                        <Checkbox />
                                    </TableCell>
                                    {visibleHeaders.map((header) => (
                                        <TableCell key={`${rowIndex}-${header}`}>
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
