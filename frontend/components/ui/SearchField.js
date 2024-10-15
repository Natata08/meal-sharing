"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import TextField from "@mui/material/TextField";

export default function SearchField() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("title", term);
    } else {
      params.delete("title");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <TextField
      size='small'
      label='Search meals'
      variant='outlined'
      onChange={(e) => handleSearch(e.target.value)}
      defaultValue={searchParams.get("title")?.toString()}
      sx={{ mr: 2, width: "250px" }}
    />
  );
}
