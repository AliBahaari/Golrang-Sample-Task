// import { TransitionGroup } from 'react-transition-group';
import { useLayoutEffect, useState, Fragment } from "react";
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
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Toaster } from "react-hot-toast";

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

export default function Home() {
  const [allItems, setAllItems] = useState(null);
  const [sampleItems, setSampleItems] = useState(null);

  const [itemTypeText, setItemTypeText] = useState(null);

  const [search, setSearch] = useState("");

  const [openModal, setOpenModal] = useState(false);

  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);

  const refetchData = () => {
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
        toastFire("error", "خطای درخواست");
      }
    })();
  };

  useLayoutEffect(() => {
    refetchData();
  }, []);

  const getItemType = (itemType) => {
    setItemTypeText(itemType);
    handleModalOpen();
  };

  const handleDeleteItem = async () => {
    handleModalClose();

    try {
      const { data, status } = await deleteItem(itemTypeText);

      if (data.isSuccess === true && status === 200) {
        toastFire("success", "حذف شد.");
        refetchData();
      }
    } catch {
      toastFire("error", "خطای درخواست");
    }
  };

  const getItemUpdateValues = async (obj) => {
    try {
      const { data, status } = await updateItem(
        obj.type,
        obj.link,
        obj.prevType
      );

      if (data.isSuccess === true && status === 200) {
        toastFire("success", "آپدیت شد.");
        refetchData();
      }
    } catch {
      toastFire("error", "خطای درخواست");
    }
  };

  const handleSearch = () => {
    const items = [...allItems];
    const searchedItems = items.filter((i) => {
      if (i.type.includes(search) || i.link.includes(search)) return true;
    });

    setSampleItems(searchedItems);
  };

  const clearSearch = () => {
    setSearch("");
    setSampleItems(allItems);
  };

  const [mode, setMode] = useState(0);

  const theme = createTheme({
    palette: {
      // type: 'light',
      type: "dark",
      primary: {
        main: "#ff9800",
        light: "#ffb74d",
        dark: "#f57c00",
        contrastText: "rgba(0, 0, 0, 0.87)",
      },
      background: {
        default: "#161B25",
        paper: "#161b25",
        // default: '#fafafa',
        // paper: '#f4f6f8',
      },
      // Dark
      text: {
        primary: "#ffffff",
        secondary: "rgba(255, 255, 255, 0.7)",
        disabled: "rgba(255, 255, 255, 0.5)",
        hint: "rgba(255, 255, 255, 0.5)",
      },
      divider: "rgba(255,255,255,0.12)",
      action: {
        disabledBackground: "rgba(255, 255, 255, 0.12)",
        disabled: "rgba(255, 255, 255, 0.3)",
      },
    },
    // Dark
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: "rgba(255, 255, 255, 0.23)",
            fill: "rgb(255, 255, 255)",
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            color: "rgb(255, 255, 255)",
            fill: "#FFF",
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          icon: {
            fill: "#FFF",
          },
        },
      },
    },
    typography: {
      fontFamily: "Vazirmatn FD",
    },
    direction: "rtl",
  });

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        {/* backgroundColor: "#161B25 / #FFF" */}
        <div
          dir="rtl"
          style={{
            backgroundColor: "#161B25",
            padding: "40px 0",
            minHeight: "100vh",
          }}
        >
          <Toaster />

          {/* backgroundColor: "#FFF / ''" / elevation={1 / 0} */}
          <Paper
            elevation={0}
            sx={{ width: 2 / 3, mx: "auto", p: 4, borderRadius: 4 }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                gap: 2,
              }}
            >
              <Button variant="text">English</Button>
              <Button variant="text">فارسی</Button>
            </Box>

            <Typography variant="overline" display="block">
              جستجوی مسیر های ارتباطی
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
                sx={{ ml: 1, flex: 1 }}
                placeholder="جستجو..."
                inputProps={{ "aria-label": "جستجو" }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              <IconButton
                type="submit"
                sx={{ p: "10px" }}
                aria-label="search"
                onClick={clearSearch}
                disabled={search.length === 0}
              >
                <ClearIcon />
              </IconButton>
              <IconButton
                type="submit"
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
                  getItemType={getItemType}
                  getItemUpdateValues={getItemUpdateValues}
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
                  backgroundColor: "#FFF",
                  borderRadius: 2,
                  p: 4,
                }}
              >
                <Typography
                  id="modal-title"
                  variant="h6"
                  component="h2"
                  sx={{ textAlign: "left" }}
                >
                  آیا از تصمیم خود مطمئن هستید؟
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: 1,
                    mt: 4,
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={handleDeleteItem}
                    size="small"
                  >
                    حذف
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={handleModalClose}
                    size="small"
                  >
                    انصراف
                  </Button>
                </Box>
              </Box>
            </Modal>
          </Paper>
        </div>
      </ThemeProvider>
    </CacheProvider>
  );
}
