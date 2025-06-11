"use client";

import { useSearchStore } from "@/store/search";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

export function SearchAndFilter() {
  const {
    searchTerm,
    selectedRegion,
    setSearchTerm,
    setSelectedRegion,
    clearFilters,
  } = useSearchStore();

  const hasActiveFilters = searchTerm || selectedRegion;

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-end">
      <div className="relative w-full sm:w-80">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search for a country"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <Select value={selectedRegion} onValueChange={setSelectedRegion}>
        <SelectTrigger className="w-full sm:w-48">
          <SelectValue placeholder="Filter by Region" />
        </SelectTrigger>
        <SelectContent>
          {regions.map((region) => (
            <SelectItem key={region} value={region}>
              {region}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {hasActiveFilters && (
        <Button
          variant="outline"
          onClick={clearFilters}
          className="flex items-center space-x-2"
        >
          <X className="h-4 w-4" />
          <span>Clear</span>
        </Button>
      )}
    </div>
  );
}