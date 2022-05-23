import { useState } from "react";
import { Typography, Button, Box } from "@mui/material";
import AddItemCollapseComponent from "./AddItemCollapseComponent";
import { useTranslations } from "next-intl";

export default function AddItemComponent({ refetchData }) {
  const t = useTranslations("General");

  const [openPostForm, setOpenPostForm] = useState(false);

  const handleOpenPostForm = (): void =>
    setOpenPostForm((prevState) => !prevState);
  const handleClosePostForm = (): void => setOpenPostForm(false);

  return (
    <Box>
      <Typography variant="overline" display="block">
        {t("SOCIALS")}
      </Typography>

      <Button
        disabled={openPostForm}
        variant="text"
        sx={{ my: 2 }}
        onClick={handleOpenPostForm}
      >
        {t("ADD_SOCIAL")}
      </Button>

      <AddItemCollapseComponent
        openPostForm={openPostForm}
        handleClosePostForm={handleClosePostForm}
        refetchData={refetchData}
      />
    </Box>
  );
}

export function getStaticProps({ locale }) {
  return {
    props: {
      messages: require(`../i18n/${locale}.json`),
    },
  };
}
