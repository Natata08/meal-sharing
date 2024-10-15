"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";

export default function AvailabilityFilter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const showAvailableOnly =
    searchParams.get("availableReservations") === "true";

  const handleChange = (event) => {
    const params = new URLSearchParams(searchParams);
    if (event.target.checked) {
      params.set("availableReservations", "true");
    } else {
      params.delete("availableReservations");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Box sx={{ ml: 2 }}>
      <FormControlLabel
        control={
          <Checkbox
            checked={showAvailableOnly}
            onChange={handleChange}
            name='availableReservations'
          />
        }
        label='Available spots only'
      />
    </Box>
  );
}
