"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const sortFields = [
  { value: "scheduled_at", label: "Date" },
  { value: "max_reservations", label: "Max reservations" },
  { value: "price", label: "Price" },
  { value: "average_stars", label: "Rating" },
];

const sortDirections = [
  { value: "asc", label: "Ascending" },
  { value: "desc", label: "Descending" },
];

export default function SortControls() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const currentSortKey = searchParams.get("sortKey") || "scheduled_at";
  const currentSortDir = searchParams.get("sortDir") || "asc";

  const handleSortChange = (param, value) => {
    const params = new URLSearchParams(searchParams);
    params.set(param, value);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <FormControl size='small' sx={{ minWidth: 120 }}>
        <InputLabel>Sort By</InputLabel>
        <Select
          value={currentSortKey}
          label='Sort By'
          onChange={(e) => handleSortChange("sortKey", e.target.value)}
        >
          {sortFields.map((field) => (
            <MenuItem key={field.value} value={field.value}>
              {field.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl size='small' sx={{ minWidth: 120 }}>
        <InputLabel>Direction</InputLabel>
        <Select
          value={currentSortDir}
          label='Direction'
          onChange={(e) => handleSortChange("sortDir", e.target.value)}
        >
          {sortDirections.map((dir) => (
            <MenuItem key={dir.value} value={dir.value}>
              {dir.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
