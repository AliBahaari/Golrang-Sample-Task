// import { TransitionGroup } from 'react-transition-group';
import { useLayoutEffect, useState, Fragment, createContext } from "react";
import {
  Paper,
  Box,
  Modal,
  Button,
  Typography,
  IconButton,
  InputBase,
  Divider,
} from "@mui/material";
import axios from "axios";
import { isEmpty } from "lodash";
import AddItemComponent from "../components/AddItemComponent";
import ItemsComponent from "../components/ItemsComponent";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { toastFire } from "../utils/Toast.ts";
import { getItems, deleteItem, updateItem } from "../api/Api.ts";
import { ThemeProvider } from "@mui/material/styles";
import { Toaster } from "react-hot-toast";
import { lightTheme, darkTheme } from "../themes";
import ContrastIcon from "@mui/icons-material/Contrast";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";

export const ThemeContext = createContext();

export default function Home() {
  const t = useTranslations("General");
  const router = useRouter();

  const [allItems, setAllItems] = useState(null);
  const [sampleItems, setSampleItems] = useState(null);
  const [itemType, setItemType] = useState(null);
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleModalOpen = (): void => setOpenModal(true);
  const handleModalClose = (): void => setOpenModal(false);

  const refetchData = (): void => {
    (async () => {
      try {
        const { data, status } = await getItems();

        if (!isEmpty(data) && status === 200) {
          setAllItems(data);
          setSampleItems(data);
        } else if (isEmpty([])) {
          setAllItems(null);
          setSampleItems(null);
        }
      } catch {
        toastFire(
          "error",
          `${router.locale === "en" ? "Request Error" : "خطای درخواست"}`
        );
      }
    })();
  };

  useLayoutEffect(() => {
    refetchData();
  }, []);

  const handleGetItemType = (itemType: string): void => {
    setItemType(itemType);
    handleModalOpen();
  };

  const handleDeleteItem = async (): void => {
    handleModalClose();

    try {
      const { data, status } = await deleteItem(itemType);

      if (data.isSuccess === true && status === 200) {
        toastFire(
          "success",
          `${router.locale === "en" ? "Deleted" : "حذف شد."}`
        );
        refetchData();
      }
    } catch {
      toastFire(
        "error",
        `${router.locale === "en" ? "Request Error" : "خطای درخواست"}`
      );
    }
  };

  const handleGetItemUpdateValues = async (obj: any): void => {
    try {
      const { data, status } = await updateItem(
        obj.type,
        obj.link,
        obj.prevType
      );

      if (data.isSuccess === true && status === 200) {
        toastFire(
          "success",
          `${router.locale === "en" ? "Updated" : "آپدیت شد."}`
        );
        refetchData();
      }
    } catch {
      toastFire(
        "error",
        `${router.locale === "en" ? "Request Error" : "خطای درخواست"}`
      );
    }
  };

  const handleSearch = (): void => {
    const items = [...allItems];
    const searchedItems = items.filter((i) => {
      if (i.type.includes(search) || i.link.includes(search)) return true;
    });

    setSampleItems(searchedItems);
  };

  const handleClearSearch = (): void => {
    setSearch("");
    setSampleItems(allItems);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <div
        dir={router.locale === "en" ? "ltr" : "rtl"}
        style={{
          backgroundColor: `${darkMode ? "#161B25" : "#FFF"}`,
          padding: "40px 0",
          minHeight: "100vh",
        }}
      >
        <ThemeContext.Provider value={darkMode}>
          <Toaster />

          <Paper
            elevation={darkMode ? 0 : 1}
            sx={{
              width: { md: 2 / 3 },
              mx: { xs: 3, md: "auto" },
              p: { xs: 2, sm: 4 },
              borderRadius: 4,
              backgroundColor: `${darkMode ? "rgb(33, 43, 53)" : "#FFF"}`,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: 2,
              }}
            >
              <Button
                variant="text"
                onClick={
                  router.locale === "fa" ? () => router.push("en") : () => {}
                }
                sx={router.locale === "fa" && { color: "rgb(121, 131, 142)" }}
              >
                English
              </Button>
              <Button
                variant="text"
                onClick={
                  router.locale === "en" ? () => router.push("fa") : () => {}
                }
                sx={router.locale === "en" && { color: "rgb(121, 131, 142)" }}
              >
                فارسی
              </Button>
              <IconButton
                onClick={() => setDarkMode((prevState) => !prevState)}
                sx={{ p: "10px" }}
                aria-label="theme"
              >
                <ContrastIcon />
              </IconButton>
            </Box>

            <Typography variant="overline" display="block">
              {t("SEARCH_SOCIALS")}
            </Typography>
            <Paper
              elevation={0}
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                mb: 4,
              }}
            >
              <InputBase
                sx={{ mx: 1, flex: 1 }}
                placeholder={t("SEARCH_PLACEHOLDER")}
                inputProps={{ "aria-label": "جستجو" }}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  if (e.target.value.toString().length === 0) {
                    setSampleItems(allItems);
                  }
                }}
              />
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              <IconButton
                sx={{ p: "10px" }}
                aria-label="clear"
                onClick={handleClearSearch}
                disabled={search.length === 0}
              >
                <ClearIcon />
              </IconButton>
              <IconButton
                sx={{ p: "10px" }}
                aria-label="search"
                onClick={handleSearch}
                disabled={search.length === 0}
              >
                <SearchIcon />
              </IconButton>
            </Paper>

            <AddItemComponent refetchData={refetchData} />

            {/*<TransitionGroup>*/}
            {sampleItems?.map((item, index) => (
              <Fragment key={index}>
                <ItemsComponent
                  itemData={item}
                  handleGetItemType={handleGetItemType}
                  handleGetItemUpdateValues={handleGetItemUpdateValues}
                />
              </Fragment>
            ))}
            {/*</TransitionGroup>*/}

            <Modal
              open={openModal}
              onClose={handleModalClose}
              aria-labelledby="modal-title"
              aria-describedby="modal-description"
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "400px",
                  backgroundColor: `${darkMode ? "rgb(33, 43, 53)" : "#FFF"}`,
                  color: `${darkMode && "#FFF"}`,
                  borderRadius: 2,
                  p: 4,
                }}
              >
                <Typography
                  id="modal-title"
                  variant="p"
                  component="h4"
                  sx={{
                    textAlign: `${router.locale === "en" ? "left" : "right"}`,
                  }}
                >
                  {t("MODAL_TITLE")}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: `${
                      router.locale === "en" ? "flex-end" : "flex-start"
                    }`,
                    gap: 1,
                    mt: 4,
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={handleDeleteItem}
                    size="small"
                    sx={router.locale === "en" && { order: 1 }}
                  >
                    {t("DELETE")}
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={handleModalClose}
                    size="small"
                  >
                    {t("CANCEL")}
                  </Button>
                </Box>
              </Box>
            </Modal>
          </Paper>
        </ThemeContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export function getStaticProps({ locale }) {
  return {
    props: {
      messages: require(`../i18n/${locale}.json`),
    },
  };
}
