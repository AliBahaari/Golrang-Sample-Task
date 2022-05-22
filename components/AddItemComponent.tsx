import { useState } from "react";
import { Typography, Button, Box } from "@mui/material";
import AddItemCollapseComponent from "./AddItemCollapseComponent";

export default function AddItemComponent({ refetchData }) {
  const [openAddForm, setOpenAddForm] = useState(false);

  const handleOpenAddForm = () => setOpenAddForm((prevState) => !prevState);
  const handleCloseAddForm = () => setOpenAddForm(false);

  return (
    <Box>
      <Typography variant="overline" display="block">
        مسیر های ارتباطی
      </Typography>

      <Button
        disabled={openAddForm}
        variant="text"
        sx={{ my: 2 }}
        onClick={handleOpenAddForm}
      >
        افزودن مسیر ارتباطی
      </Button>

      <AddItemCollapseComponent
        openAddForm={openAddForm}
        handleCloseAddForm={handleCloseAddForm}
        refetchData={refetchData}
      />
    </Box>
  );
}
