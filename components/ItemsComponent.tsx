import { useState, useEffect, useContext } from "react";
import {
  Typography,
  Button,
  Collapse,
  TextField,
  Select,
  MenuItem,
  Grid,
  Box,
  Modal,
  Card,
  CardActions,
  CardContent,
  FormControl,
  InputLabel,
  Link,
  IconButton,
  Paper,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { useFormik } from "formik";
import * as Yup from "yup";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TelegramIcon from "@mui/icons-material/Telegram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PublicIcon from "@mui/icons-material/Public";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { ThemeContext } from "../pages";
import { useTranslations } from 'next-intl';
import {useRouter} from 'next/router';

const validationSchema = Yup.object().shape({
  itemLink: Yup.string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      "لینک اشتباه است."
    )
    .required("لینک اجباری است."),
});

export default function ItemsComponent({
  itemData,
  handleGetItemType,
  handleGetItemUpdateValues,
}) {
  const t = useTranslations('General');
  const router = useRouter();

  const darkMode = useContext(ThemeContext);

  const { type, link } = itemData;

  const [itemType, setItemType] = useState(type as string);
  const [openEditForm, setOpenEditForm] = useState(false);

  const handleOpenEditForm = (): void => setOpenEditForm((prevState) => !prevState);
  const handleCloseEditForm = (): void => setOpenEditForm(false);

  const formik = useFormik({
    initialValues: {
      itemLink: link,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      handleGetItemUpdateValues({
        type: itemType,
        link: values.itemLink,
        prevType: type,
      });
    },
  });

  const handleTypeIcon = () => {
    switch (type) {
      case "توییتر":
        return <TwitterIcon />;
      case "اینستاگرام":
        return <InstagramIcon />;
      case "فیسبوک":
        return <FacebookIcon />;
      case "تلگرام":
        return <TelegramIcon />;
      case "لینکدین":
        return <LinkedInIcon />;
      case "وبسایت":
        return <PublicIcon />;
    }
  };

  const handleTypeTranslation = (type): string => {
    switch (type) {
      case "توییتر":
        return "Twitter";
      case "اینستاگرام":
        return "Instagram";
      case "فیسبوک":
        return "Facebook";
      case "تلگرام":
        return "Telegram";
      case "لینکدین":
        return "LinkedIn";
      case "وبسایت":
        return "Website";
    }
  };  

  const handleHelperTranslation = (text): string => {
    switch (text) {
      case "لینک اشتباه است.":
        return "Wrong URL address.";
      case "لینک اجباری است.":
        return "The URL address is required.";
    }
  }  

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 4,
        display: "flex",
        flexDirection: "column",
        my: 2,
        p: 2,
        backgroundColor: `${darkMode && "rgb(52, 61, 72)"}`,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: {xs: "column", sm: "row"},
            gap: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            {handleTypeIcon()}
            <Typography variant="body1" display="inline-block">
              {router.locale === "en" ? handleTypeTranslation(type) : type}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            <Typography variant="caption" display="inline-block">
              {t('LINK_TEXT')}
              {":"}
            </Typography>
            <Link href={link} target="blank">
              {link}
            </Link>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            flexDirection: {xs: "column", sm: "row"},
            gap: 1,
          }}
        >
          <IconButton
            color="primary"
            onClick={handleOpenEditForm}
            sx={{ p: "10px", display: {sm: "none"} }}
            aria-label="edit"
          >
            <EditIcon />
          </IconButton> 
          <IconButton
            color="error"
            onClick={() => handleGetItemType(type)}
            sx={{ p: "10px", display: {sm: "none"} }}
            aria-label="delete"
          >
            <DeleteIcon />
          </IconButton>           

          <Button
            disabled={openEditForm}
            variant="text"
            onClick={handleOpenEditForm}
            startIcon={<EditIcon />}
            sx={{
              display: {xs: "none", sm: "flex"}
            }}
          >
            {t('EDIT')}
          </Button>
          <Button
            variant="text"
            onClick={() => handleGetItemType(type)}
            color="error"
            startIcon={<DeleteIcon />}
            sx={{
              display: {xs: "none", sm: "flex"}
            }}            
          >
            {t('DELETE')}
          </Button>
        </Box>
      </Box>

      {/* Collapse */}

      <Collapse in={openEditForm}>
        <Card
          sx={{
            p: 2,
            borderRadius: 4,
            backgroundColor: `${darkMode && "rgb(52, 61, 72)"}`,
            backgroundImage: `${
              darkMode &&
              "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))"
            }`,
          }}
          elevation={0}
        >
          <form onSubmit={formik.handleSubmit}>
            <CardContent>
              <Typography variant="body2" display="block" sx={{ mb: 2 }}>
                {t('ADD_SOCIAL_TYPE')}
                {" "}
                {router.locale === "en" ? handleTypeTranslation(itemType) : itemType}
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel id="item-type-select-label">
                      {t('TYPE_TEXT')}
                    </InputLabel>
                    <Select
                      labelId="item-type-select-label"
                      id="item-type-select"
                      value={itemType}
                      sx={{ display: "flex", flexDirection: "row" }}
                      label="نوع"
                      onChange={(event: SelectChangeEvent) =>
                        setItemType(event.target.value as string)
                      }
                    >
                      <MenuItem
                        value={"توییتر"}
                        sx={{ justifyContent: `${router.locale === "en" ? "flex-start" : "flex-end"}` }}
                      >
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 2 }}
                        >
                          {
                            router.locale === "en" ? (
                              <>
                                <TwitterIcon />
                                <span>Twitter</span>
                              </>
                            ) : (
                              <>
                                <span>توییتر</span>
                                <TwitterIcon />
                              </>
                            )
                          }
                        </Box>
                      </MenuItem>

                      <MenuItem
                        value={"اینستاگرام"}
                        sx={{ justifyContent: `${router.locale === "en" ? "flex-start" : "flex-end"}` }}
                      >
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 2 }}
                        >
                          {
                            router.locale === "en" ? (
                              <>
                                <InstagramIcon />
                                <span>Instagram</span>
                              </>
                            ) : (
                              <>
                                <span>اینستاگرام</span>
                                <InstagramIcon />
                              </>
                            )
                          }                        
                        </Box>
                      </MenuItem>
                      <MenuItem
                        value={"فیسبوک"}
                        sx={{ justifyContent: `${router.locale === "en" ? "flex-start" : "flex-end"}` }}
                      >
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 2 }}
                        >
                          {
                            router.locale === "en" ? (
                              <>
                                <FacebookIcon />
                                <span>Facebook</span>
                              </>
                            ) : (
                              <>
                                <span>فیسبوک</span>
                                <FacebookIcon />
                              </>
                            )
                          }                            
                        </Box>
                      </MenuItem>
                      <MenuItem
                        value={"تلگرام"}
                        sx={{ justifyContent: `${router.locale === "en" ? "flex-start" : "flex-end"}` }}
                      >
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 2 }}
                        >
                          {
                            router.locale === "en" ? (
                              <>
                                <TelegramIcon />
                                <span>Telegram</span>
                              </>
                            ) : (
                              <>
                                <span>تلگرام</span>
                                <TelegramIcon />
                              </>
                            )
                          }                            
                        </Box>
                      </MenuItem>
                      <MenuItem
                        value={"لینکدین"}
                        sx={{ justifyContent: `${router.locale === "en" ? "flex-start" : "flex-end"}` }}
                      >
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 2 }}
                        >
                          {
                            router.locale === "en" ? (
                              <>
                                <LinkedInIcon />
                                <span>LinkedIn</span>
                              </>
                            ) : (
                              <>
                                <span>لینکدین</span>
                                <LinkedInIcon />
                              </>
                            )
                          }                            
                        </Box>
                      </MenuItem>
                      <MenuItem
                        value={"وبسایت"}
                        sx={{ justifyContent: `${router.locale === "en" ? "flex-start" : "flex-end"}` }}
                      >
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 2 }}
                        >
                          {
                            router.locale === "en" ? (
                              <>
                                <PublicIcon />
                                <span>Website</span>
                              </>
                            ) : (
                              <>
                                <span>وبسایت</span>
                                <PublicIcon />
                              </>
                            )
                          }                              
                        </Box>
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <TextField
                    fullWidth
                    id="itemLink"
                    name="itemLink"
                    label={t('LINK_TEXT')}
                    sx={{ input: { textAlign: `${router.locale === "en" ? "left" : "right"}` } }}
                    value={formik.values.itemLink}
                    onChange={formik.handleChange}
                    error={formik.touched.itemLink && Boolean(formik.errors.itemLink)}
                    helperText={formik.touched.itemLink && handleHelperTranslation(formik.errors.itemLink)}
                  />
                </Grid>
              </Grid>
            </CardContent>
            <CardActions
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                gap: 1
              }}
            >
              <Button
                type="reset"
                size="small"
                variant="outlined"
                onClick={() => {
                  formik.resetForm();
                  handleCloseEditForm();
                }}
              >
                {t('CANCEL')}
              </Button>
              <Button
                size="small"
                variant="contained"
                type="submit"
                disabled={formik.values.itemLink.length === 0}
              >
                {t('SUBMIT')}
                {" "}
                {router.locale === "en" ? handleTypeTranslation(itemType) : itemType}
              </Button>
            </CardActions>
          </form>
        </Card>
      </Collapse>      
    </Paper>
  );
}

export function getStaticProps({ locale }) {
  return {
    props: {
      messages: require(`../i18n/${locale}.json`),
    },
  };
}