"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Filter, Search, X } from "lucide-react";
import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";

export function JobOffersFilters() {
  // Query state for search and filters
  const [search, setSearch] = useQueryState("search", {
    defaultValue: "",
    shallow: false,
    throttleMs: 300,
  });

  const [statusFilter, setStatusFilter] = useQueryState("status", {
    defaultValue: "",
    shallow: false,
    throttleMs: 300,
  });

  // Local state for input field
  const [searchValue, setSearchValue] = useState("");

  // Initialize local state from URL parameters
  useEffect(() => {
    setSearchValue(search);
  }, [search]);

  // Selected statuses
  const selectedStatuses = statusFilter
    ? statusFilter.split(",").filter(Boolean)
    : [];

  // Status options
  const statusOptions = [
    { value: "to be launched", label: "To Be Launched" },
    { value: "ongoing", label: "Ongoing Process" },
    { value: "closed", label: "Closed" },
  ];

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  // Submit search after delay
  const handleSearchSubmit = () => {
    void setSearch(searchValue);
  };

  // Clear search
  const clearSearch = () => {
    setSearchValue("");
    void setSearch("");
  };

  // Toggle status filter
  const toggleStatus = (status: string) => {
    const currentStatuses = [...selectedStatuses];

    if (currentStatuses.includes(status)) {
      const filtered = currentStatuses.filter((s) => s !== status);
      void setStatusFilter(filtered.length ? filtered.join(",") : "");
    } else {
      currentStatuses.push(status);
      void setStatusFilter(currentStatuses.join(","));
    }
  };

  return (
    <div className="flex w-full flex-col gap-2 sm:flex-row">
      <div className="relative flex-1">
        <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
        <Input
          type="text"
          placeholder="Search job offers..."
          className="pr-9 pl-9"
          value={searchValue}
          onChange={handleSearchChange}
          onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
          onBlur={handleSearchSubmit}
        />
        {searchValue && (
          <Button
            variant="ghost"
            size="icon"
            onClick={clearSearch}
            className="absolute top-0 right-0 h-9 w-9 rounded-l-none"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Clear search</span>
          </Button>
        )}
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
            {selectedStatuses.length > 0 && (
              <span className="bg-primary text-primary-foreground ml-1 flex h-5 w-5 items-center justify-center rounded-full text-xs">
                {selectedStatuses.length}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          {statusOptions.map((status) => (
            <DropdownMenuCheckboxItem
              key={status.value}
              checked={selectedStatuses.includes(status.value)}
              onCheckedChange={() => toggleStatus(status.value)}
            >
              {status.label}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
